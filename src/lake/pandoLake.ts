import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
  IAddLiquidityActionParams,
  IAsset,
  IPair,
  IRemoveLiquidityActionParams,
  ISwapActionParams,
} from './types';

export class PandoLake {
  public api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://mtgswap-api.fox.one',
    });
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  info(): Promise<{
    ts: number;
    data: {
      members: string[];
      public_key: string;
      threshold: number;
    };
  }> {
    return this.api.get('api/info');
  }

  assets(): Promise<{
    ts: number;
    data: {
      assets: IAsset[];
    };
  }> {
    return this.api.get('api/assets');
  }

  pairs(): Promise<{
    ts: number;
    data: {
      pairs: IPair[];
    };
  }> {
    return this.api.get('api/pairs');
  }

  marketInfo(params: { baseAssetId: string; quoteAssetId: string }): Promise<{
    ts: number;
    data: Array<{
      ts: number;
      date: string;
      value: string;
      volume: string;
    }>;
  }> {
    const { baseAssetId, quoteAssetId } = params;
    return this.api.get(`api/stats/markets/${baseAssetId}/${quoteAssetId}`);
  }

  marketKline(params: {
    baseAssetId: string;
    quoteAssetId: string;
    dur?: string;
  }): Promise<{
    ts: number;
    data: Array<[number, string, string]>;
  }> {
    const { baseAssetId, quoteAssetId, dur = '4320h' } = params;
    return this.api.get(
      `api/stats/markets/${baseAssetId}/${quoteAssetId}/kline/v2?dur=${dur}`,
    );
  }

  createAction(
    type: 'ADD' | 'REMOVE' | 'SWAP',
    params:
      | IAddLiquidityActionParams
      | IRemoveLiquidityActionParams
      | ISwapActionParams,
  ) {
    switch (type) {
      case 'ADD':
        return this.createAddLiquidityAction(
          params as IAddLiquidityActionParams,
        );
      case 'REMOVE':
        return this.createRemoveLiquidityAction(
          params as IRemoveLiquidityActionParams,
        );
      case 'SWAP':
        return this.createSwapAction(params as ISwapActionParams);
    }
  }

  createAddLiquidityAction(params: IAddLiquidityActionParams) {
    const {
      receiverId,
      followId,
      assetId,
      slippage = 0.001,
      timeout = 300000,
      amount,
      brokerId,
      traceId,
    } = params;
    const action = `1,${receiverId},${followId},${assetId},${slippage},${timeout}`;
    return this._createAction({
      action,
      amount,
      assetId,
      brokerId,
      traceId,
    });
  }

  createRemoveLiquidityAction(params: IRemoveLiquidityActionParams) {
    const { receiverId, followId, assetId, amount, brokerId, traceId } = params;
    const action = `2,${receiverId},${followId}`;
    return this._createAction({
      action,
      amount,
      assetId,
      brokerId,
      traceId: traceId || followId,
    });
  }

  createSwapAction(params: ISwapActionParams) {
    const {
      receiverId,
      followId,
      assetId,
      fillAssetId,
      routes = '',
      minimum = '',
      amount,
      brokerId,
      traceId,
    } = params;
    const action = `3,${receiverId},${followId},${fillAssetId},${routes},${minimum}`;
    return this._createAction({
      action,
      amount,
      assetId,
      brokerId,
      traceId: traceId || followId,
    });
  }

  _createAction(params: {
    action: string;
    amount: number;
    assetId: string;
    brokerId?: string;
    traceId?: string;
  }): Promise<{
    ts: number;
    data: {
      action: string;
      code: string;
      code_url: string;
      follow_id: string;
    };
  }> {
    const { action, amount, assetId, brokerId = '', traceId } = params;
    return this.api.post('api/actions', {
      action,
      amount: amount.toFixed(8),
      asset_id: assetId,
      broker_id: brokerId,
      trace_id: traceId || uuidv4(),
    });
  }
}

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { IAsset, IPair } from './types';
import { v4 as uuidv4 } from 'uuid';

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
    dur: string;
  }): Promise<{
    ts: number;
    data: Array<[number, string, string]>;
  }> {
    const { baseAssetId, quoteAssetId, dur } = params;
    return this.api.get(
      `api/stats/markets/${baseAssetId}/${quoteAssetId}/kline/v2?dur=${dur}`,
    );
  }

  createAction() {}

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

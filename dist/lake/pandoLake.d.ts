import { AxiosInstance } from 'axios';
import { IAsset, IPair } from './types';
export declare class PandoLake {
    api: AxiosInstance;
    constructor();
    info(): Promise<{
        ts: number;
        data: {
            members: string[];
            public_key: string;
            threshold: number;
        };
    }>;
    assets(): Promise<{
        ts: number;
        data: {
            assets: IAsset[];
        };
    }>;
    pairs(): Promise<{
        ts: number;
        data: {
            pairs: IPair[];
        };
    }>;
    marketInfo(params: {
        baseAssetId: string;
        quoteAssetId: string;
    }): Promise<{
        ts: number;
        data: Array<{
            ts: number;
            date: string;
            value: string;
            volume: string;
        }>;
    }>;
    marketKline(params: {
        baseAssetId: string;
        quoteAssetId: string;
        dur: string;
    }): Promise<{
        ts: number;
        data: Array<[number, string, string]>;
    }>;
    createAction(params: {
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
    }>;
}

export interface IPair {
    base_asset_id: string;
    quote_asset_id: string;
    base_amount: number;
    quote_amount: number;
    liquidity: number;
    liquidity_asset_id: string;
    route_id: number;
    fee_percent: number;
    max_liquidity: number;
    base_value: number;
    quote_value: number;
    volume_24h: number;
    fee_24h: number;
    transaction_count_24h: number;
    version: number;
    base_volume_24h: number;
    quote_volume_24h: number;
}
export interface IAsset {
    id: string;
    name: string;
    symbol: string;
    logo: string;
    chain_id: string;
    chain: IAsset;
    price: number;
    extra: {
        circulation: number;
        name: string;
        explorer: string;
        intro: {
            en: string[];
        };
        website: string;
        issue: string;
        total: number;
    };
}
export declare enum ActionType {
    AddLiquidity = 1,
    RemoveLiquidity = 2,
    Swap = 3
}

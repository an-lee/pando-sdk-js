export interface IPair {
  // the asset id of base and quote assets
  base_asset_id: string;
  quote_asset_id: string;
  // the amount of base and quote assets
  base_amount: string;
  quote_amount: string;
  // the liquidity of this pair
  liquidity: string;
  // the asset id of LP-Token of this pair
  liquidity_asset_id: string;
  // the route id of this pair
  route_id: number;
  // fee 0.3%
  fee_percent: string;
  max_liquidity: string;
  base_value: string;
  quote_value: string;
  volume_24h: string;
  fee_24h: string;
  transaction_count_24h: number;
  version: number;
  base_volume_24h: string;
  quote_volume_24h: string;
}

export interface IAsset {
  // asset id
  id: string;
  // displayed name, symbol and icon
  name: string;
  symbol: string;
  logo: string;
  // asset id of chain asset
  chain_id: string;
  // chain asset entity
  chain: IAsset;
  // price in US Dollar
  price: string;
  // extra information of this assets
  extra: {
    circulation: string;
    name: string;
    explorer: string;
    intro: {
      en: string[];
    };
    website: string;
    issue: string;
    total: string;
  };
}

export interface IAddLiquidityActionParams {
  receiverId: string;
  followId: string;
  assetId: string;
  opponentAssetId: string;
  amount: number;
  slippage?: number;
  timeout?: number;
  brokerId?: string;
  traceId?: string;
}

export interface IRemoveLiquidityActionParams {
  receiverId: string;
  followId: string;
  assetId: string;
  amount: number;
  brokerId?: string;
  traceId?: string;
}

export interface ISwapActionParams {
  receiverId: string;
  followId: string;
  assetId: string;
  fillAssetId: string;
  amount: number;
  routes?: string;
  minimum?: string;
  brokerId?: string;
  traceId?: string;
}

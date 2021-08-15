export interface IPair {
  // the asset id of base and quote assets
  base_asset_id: string;
  quote_asset_id: string;
  // the amount of base and quote assets
  base_amount: number;
  quote_amount: number;
  // the liquidity of this pair
  liquidity: number;
  // the asset id of LP-Token of this pair
  liquidity_asset_id: string;
  // the route id of this pair
  route_id: number;
  // fee 0.3%
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
  price: number;
  // extra information of this assets
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

export enum ActionType {
  AddLiquidity = 1,
  RemoveLiquidity = 2,
  Swap = 3,
}

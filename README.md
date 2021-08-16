# pando-sdk-js

An unofficial Pando SDK implemented in Javascript.

## Usage

```bash
yarn add pando-sdk-js
```

```javascript
const { PandoLake } from 'pando-sdk-js';

const lake = new PandoLake;

// Pando Lake MTG info
const info = lake.info();
console.log(info);

// Pando Lake list assets
const assets = lake.assets();
console.log(assets);

// Pando Lake list pairs
const pairs = lake.pairs();
console.log(pairs);

// Pando Lake market info
const BTC_ASSET_ID = 'c6d0c728-2624-429b-8e0d-d9d19b6592fa';
const PANDO_ASSET_ID = '31d2ea9c-95eb-3355-b65b-ba096853bc18';
const market = await lake.marketInfo({
  baseAssetId: BTC_ASSET_ID,
  quoteAssetId: PANDO_ASSET_ID,
});
console.log(market);

// Pando Lake market K line
const kline = await lake.marketKline({
  baseAssetId: BTC_ASSET_ID,
  quoteAssetId: PANDO_ASSET_ID,
  dur: '4320h',
});
console.log(kline);

// Pando Lake swap asset
const followId = uuidv4();
const swap = await lake.createAction('SWAP', {
  receiverId,
  followId,
  assetId: PANDO_ASSET_ID,
  fillAssetId: BTC_ASSET_ID,
  amount: 0.01,
});
// use code_url to invoke transfer in Mixin Messenger
console.log(swap.data.code_url);
// use action as memo to transfer programmatically
console.log(swap.data.action);

// Pando Lake add Liquidity
const EOS_ASSET_ID = '6cfe566e-4aad-470b-8c9a-2fd35b49c68d';
const XIN_ASSET_ID = 'c94ac88f-4671-3976-b60a-09064f1811e8';
const followId = uuidv4();
const eosTx = await lake.createAction('ADD', {
  receiverId,
  followId,
  assetId: EOS_ASSET_ID,
  opponentAssetId: XIN_ASSET_ID,
  amount: 0.1,
});
// use code_url to invoke transfer in Mixin Messenger to pay EOS
console.log(eosTx.data.code_url);
const xinTx = await lake.createAction('ADD', {
  receiverId,
  followId,
  assetId: EOS_ASSET_ID,
  opponentAssetId: EOS_ASSET_ID,
  amount: 0.001_373_75,
});
// use code_url to invoke transfer in Mixin Messenger to pay XIN
console.log(xinTx.data.code_url);

// Pando Lake remove liquidity
const S_EOS_XIN_ASSET_ID = 'a9eafeea-d398-3bc7-8390-29479f438c8a';
const followId = uuidv4();
const tx = await lake.createAction('REMOVE', {
  receiverId,
  followId,
  assetId: S_EOS_XIN_ASSET_ID,
  amount: 0.001,
});
// use code_url to invoke transfer in Mixin Messenger to pay sEOS-XIN
console.log(tx.data.code_url);
```

## References

- [Pando Docs](https://docs.pando.im/)

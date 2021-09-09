import { v4 as uuidv4 } from 'uuid';
import { PandoLake } from '../src/lake';

describe('lake', () => {
  let lake: PandoLake;
  const receiverId = '7ed9292d-7c95-4333-aa48-a8c640064186';
  const BTC_ASSET_ID = 'c6d0c728-2624-429b-8e0d-d9d19b6592fa';
  const PANDO_ASSET_ID = '31d2ea9c-95eb-3355-b65b-ba096853bc18';
  const EOS_ASSET_ID = '6cfe566e-4aad-470b-8c9a-2fd35b49c68d';
  const XIN_ASSET_ID = 'c94ac88f-4671-3976-b60a-09064f1811e8';
  const S_EOS_XIN_ASSET_ID = 'a9eafeea-d398-3bc7-8390-29479f438c8a';

  beforeEach(() => {
    lake = new PandoLake();
  });

  it('lake created', () => {
    expect(lake instanceof PandoLake);
  });

  it('info', async () => {
    const res = await lake.info();
    expect(res).toHaveProperty('ts');
  });

  it('assets', async () => {
    const res = await lake.assets();
    expect(res).toHaveProperty('ts');
    expect(res).toHaveProperty(['data', 'assets', 0]);
  });

  it('pairs', async () => {
    const res = await lake.pairs();
    expect(res).toHaveProperty('ts');
    expect(res).toHaveProperty(['data', 'pairs', 0]);
  });

  it('market info', async () => {
    const res = await lake.marketInfo({
      baseAssetId: BTC_ASSET_ID,
      quoteAssetId: PANDO_ASSET_ID,
    });
    expect(res).toHaveProperty(['data', 0, 'value']);
    expect(res).toHaveProperty(['data', 0, 'volume']);
  });

  it('market kline', async () => {
    const res = await lake.marketKline({
      baseAssetId: BTC_ASSET_ID,
      quoteAssetId: PANDO_ASSET_ID,
      dur: '4320h',
    });
    expect(res).toHaveProperty(['data', 0, 0]);
  });

  it('create pre order', async () => {
    const res = await lake.preOrder({
      payAssetId: PANDO_ASSET_ID,
      fillAssetId: BTC_ASSET_ID,
      funds: '1',
    });
    expect(res).toHaveProperty(['data']);
  });

  it('create swap action', async () => {
    const followId = uuidv4();
    // console.log('followId:', followId);
    const res = await lake.createAction('SWAP', {
      receiverId,
      followId,
      assetId: PANDO_ASSET_ID,
      fillAssetId: BTC_ASSET_ID,
      amount: 0.01,
    });
    expect(res).toHaveProperty(['data', 'action']);
    expect(res.data.follow_id).toEqual(followId);
  });

  it('create add liquidity action', async () => {
    const followId = uuidv4();
    // console.log('followId:', followId);
    const eosTx = await lake.createAction('ADD', {
      receiverId,
      followId,
      assetId: EOS_ASSET_ID,
      opponentAssetId: XIN_ASSET_ID,
      amount: 0.1,
      slippage: 0.005,
    });
    console.log(eosTx);
    const xinTx = await lake.createAction('ADD', {
      receiverId,
      followId,
      assetId: XIN_ASSET_ID,
      opponentAssetId: EOS_ASSET_ID,
      amount: 0.001_358_73,
    });
    console.log(xinTx);
    expect(eosTx.data.follow_id).toEqual(xinTx.data.follow_id);
  });

  it('create remove liquidity action', async () => {
    const followId = uuidv4();
    const res = await lake.createAction('REMOVE', {
      receiverId,
      followId,
      assetId: S_EOS_XIN_ASSET_ID,
      amount: 0.001,
    });
    // console.log(res);
    expect(res).toHaveProperty(['data', 'action']);
    expect(res.data.follow_id).toEqual(followId);
  });
});

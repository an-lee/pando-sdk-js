import { PandoLake } from '../src/lake';

describe('lake', () => {
  let lake: PandoLake;

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
    const BTC_ASSET_ID = 'c6d0c728-2624-429b-8e0d-d9d19b6592fa';
    const PANDO_ASSET_ID = '31d2ea9c-95eb-3355-b65b-ba096853bc18';
    const res = await lake.marketInfo({
      baseAssetId: BTC_ASSET_ID,
      quoteAssetId: PANDO_ASSET_ID,
    });
    expect(res).toHaveProperty(['data', 0, 'value']);
    expect(res).toHaveProperty(['data', 0, 'volume']);
  });

  it('market kline', async () => {
    const BTC_ASSET_ID = 'c6d0c728-2624-429b-8e0d-d9d19b6592fa';
    const PANDO_ASSET_ID = '31d2ea9c-95eb-3355-b65b-ba096853bc18';
    const res = await lake.marketKline({
      baseAssetId: BTC_ASSET_ID,
      quoteAssetId: PANDO_ASSET_ID,
      dur: '4320h',
    });
    expect(res).toHaveProperty(['data', 0, 0]);
  });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PandoLake = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
class PandoLake {
    constructor() {
        this.api = axios_1.default.create({
            baseURL: 'https://mtgswap-api.fox.one',
        });
        this.api.interceptors.response.use((response) => {
            return response.data;
        }, (error) => {
            return Promise.reject(error);
        });
    }
    info() {
        return this.api.get('api/info');
    }
    assets() {
        return this.api.get('api/assets');
    }
    pairs() {
        return this.api.get('api/pairs');
    }
    marketInfo(params) {
        const { baseAssetId, quoteAssetId } = params;
        return this.api.get(`api/stats/markets/${baseAssetId}/${quoteAssetId}`);
    }
    marketKline(params) {
        const { baseAssetId, quoteAssetId, dur = '4320h' } = params;
        return this.api.get(`api/stats/markets/${baseAssetId}/${quoteAssetId}/kline/v2?dur=${dur}`);
    }
    createAction(type, params) {
        switch (type) {
            case 'ADD':
                return this.createAddLiquidityAction(params);
            case 'REMOVE':
                return this.createRemoveLiquidityAction(params);
            case 'SWAP':
                return this.createSwapAction(params);
        }
    }
    createAddLiquidityAction(params) {
        const { receiverId, followId, assetId, opponentAssetId, slippage = 0.001, timeout = 300, amount, brokerId, traceId, } = params;
        const action = `1,${receiverId},${followId},${opponentAssetId},${slippage},${timeout}`;
        return this._createAction({
            action,
            amount,
            assetId,
            brokerId,
            traceId,
        });
    }
    createRemoveLiquidityAction(params) {
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
    createSwapAction(params) {
        const { receiverId, followId, assetId, fillAssetId, routes = '', minimum = '', amount, brokerId, traceId, } = params;
        const action = `3,${receiverId},${followId},${fillAssetId},${routes},${minimum}`;
        return this._createAction({
            action,
            amount,
            assetId,
            brokerId,
            traceId: traceId || followId,
        });
    }
    _createAction(params) {
        const { action, amount, assetId, brokerId = '', traceId } = params;
        return this.api.post('api/actions', {
            action,
            amount: amount.toFixed(8),
            asset_id: assetId,
            broker_id: brokerId,
            trace_id: traceId || uuid_1.v4(),
        });
    }
}
exports.PandoLake = PandoLake;
//# sourceMappingURL=pandoLake.js.map
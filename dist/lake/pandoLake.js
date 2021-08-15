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
        const { baseAssetId, quoteAssetId, dur } = params;
        return this.api.get(`api/stats/markets/${baseAssetId}/${quoteAssetId}/kline/v2?dur=${dur}`);
    }
    createAction(params) {
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
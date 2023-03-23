import { post, get } from "./http";
import axios from "axios";

class WaxApi {
    constructor() {
        this.waxBalanceUrl = `https://lightapi.eosamsterdam.net/api/balances/wax`
        this.waxToUSDRateURL = 'https://www.api.bloks.io/wax/ticker/%5Bobject%20Object%5D';
        this.waxNodes = process.env.REACT_APP_WAX_NODES.split(",")
        this.tablesEndpoint = "/v1/chain/get_table_rows"
        this.accountResourcesEndpoint = '/v1/chain/get_account'
    }


    async retryEndpoints(payload,extension = this.tablesEndpoint) {
        let index = 0;
        while (index < this.waxNodes.length) {
            try {
                let response = await axios.post(this.waxNodes[index] + extension, payload);
                return response.data;
            } catch (error) {
                index++;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        throw new Error("All endpoints failed");
    }


    async contractData(code, scope, table, upperBound = "", lowerBound = "", index_position = 1, limit = -1) {
        const params = {
            "json": true,
            "code": code,
            "scope": scope,
            "table": table,
            "lower_bound": lowerBound,
            "upper_bound": upperBound,
            "index_position": index_position,
            "key_type": "i64",
            "limit": limit,
            "reverse": false,
            "show_payer": false
        }
        return this.retryEndpoints(params);
    }

    async getAccountResources(account_name) {
        return this.retryEndpoints({ account_name }, this.accountResourcesEndpoint);
    }

    async getWalletBalance(wallet) {
        try {
            const balanceRes =  await get(`${this.waxBalanceUrl}/${wallet}`);
            const waxBalance = balanceRes?.balances?.find(datum => datum.currency === 'WAX')
            return waxBalance?.amount?.split(".")[0] || 0
        } catch(e) {
            throw e
        }
    }

    async getWAXToUSDRate () {
        return get(this.waxToUSDRateURL);
    }


}

export {WaxApi};

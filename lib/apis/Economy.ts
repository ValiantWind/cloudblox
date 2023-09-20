import Client from "../client";
import BaseAPI from "./Base";

export type RobuxCount = number;

// Export type ProductInfo = {

// }

class BaseEconomy extends BaseAPI {
    constructor (client?: Client) {
        super({
            baseUrl: "https://economy.roblox.com/",
            client
        });
    }

    getClientRobuxCount (): Promise<RobuxCount> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/user/currency`,
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.robux);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    // GetProductInfo(assetId: number): Promise<ProductInfo> {
    // 	return new Promise((resolve, reject) => {
    // 	this.request({
    // 		method: 'get',
    // 		path: `v2/assets/${assetId}/details`,
    // 		authRequired: false
    // 	}).then(response => {
    // 		resolve(response.data)
    // 	}).catch(error => {
    // 		reject(error)
    // 	})
    // })
    // }
}

const Economy = new BaseEconomy();

export default Economy;

import Client from "../client";
import axios from "axios";
import EventEmitter from "node:events";

export declare type RequestParameters = {
    method: string;
    path: string;
    authRequired: boolean;
    params?: object;
    data?: object;
};

export default class BaseAPI extends EventEmitter {
    public baseUrl: string;
    public client: Client;

    constructor ({ baseUrl, client }: { baseUrl: string; client?: Client }) {
        super();
        this.baseUrl = baseUrl;
        this.client = client;
    }
    request (requestParameters: RequestParameters) {
        if (requestParameters.authRequired) {
            if (!axios.defaults.headers.common.Cookie) {
                throw new Error("No cookie has been set.");
            }
        }
        const config = {
            method: requestParameters.method,
            url: `${this.baseUrl}${requestParameters.path}`,
            params: requestParameters.params,
            data: requestParameters.data
        };

        return axios(config);
    }
}

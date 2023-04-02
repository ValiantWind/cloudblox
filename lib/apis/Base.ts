import Client from "../client";
import axios from "axios";

export declare type RequestParameters = {
    method: string;
    path: string;
    requiresAuth: boolean;
    params?: object;
    data?: object;
}

export default class BaseAPI {
    public baseUrl: string;
    public client: Client;

    constructor ({ baseUrl, client }: {baseUrl: string, client?: Client}) {
        this.baseUrl = baseUrl;
        this.client = client;
    }
    request (requestParameters: RequestParameters) {
        if (requestParameters.requiresAuth) {
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

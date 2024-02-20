import Client from "../client";
import axios from "axios";

export declare type RequestParameters = {
    method: string;
    path: string;
    authRequired: boolean;
    params?: object;
    data?: object;
};

export declare type RequestOverrideParameters = {
	method: string;
	url: string;
	authRequired: boolean;
	params?: object;
	data?: object;
}

export default class BaseAPI {
    public baseUrl: string;
    public client: Client;

    constructor ({ baseUrl, client }: { baseUrl: string; client?: Client }) {
        this.baseUrl = baseUrl;
        this.client = client;
    }
    request (requestParams: RequestParameters) {
        if (requestParams.authRequired) {
            if (!axios.defaults.headers.common.Cookie) {
                throw new Error("No cookie has been set.");
            }
        }
        const config = {
            method: requestParams.method,
            url: `${this.baseUrl}${requestParams.path}`,
            params: requestParams.params,
            data: requestParams.data
        };

        return axios(config);
    }

		requestOverride(requestParams: RequestOverrideParameters){
				if(requestParams.authRequired) {
						if(!axios.defaults.headers.common.Cookie){
								throw new Error("No cookie has been set.")
							}
				}

				const config = {
						method: requestParams.method,
						url: requestParams.url,
						params: requestParams.params,
						data: requestParams.data
				};

				return axios(config);
		}
}

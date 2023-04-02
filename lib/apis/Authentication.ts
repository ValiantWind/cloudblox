import Client from "../client";
import Base from "./Base";

export type ClientPinStatus = {
    isEnabled: boolean;
    unlockedUntil: number | null;
};

export type AuthMetaData = {
    cookieLawNoticeTimeout: number;
};

class BaseAuth extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://auth.roblox.com/",
            client
        });
    }

    getClientPinStatus (): Promise<ClientPinStatus> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/account/pin",
                requiresAuth: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAuthMetaData (): Promise<AuthMetaData> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/auth/metadata",
                requiresAuth: false
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async changeClientUsername (): Promise<void> {
        await this.request({
            method: "post",
            path: "v2/username",
            requiresAuth: true
        })
            .catch(error => {
                Promise.reject(error);
            });
    }
}


const Auth = new BaseAuth();

export default Auth;

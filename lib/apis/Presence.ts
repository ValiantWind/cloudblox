import Client from "../client";
import Base from "./Base";

export type LastOnline = {
    lastOnlineTimestamps: {
        userId: number;
        lastOnline: Date;
    }[];
};

class BasePresence extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://presence.roblox.com/",
            client
        });
    }

    getLastOnline (userIds: number[]): Promise<LastOnline> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/presence/last-online",
                requiresAuth: false,
                data: {
                    userIds: [userIds.join(",")]
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async registerClientAppPresence (location: string, placeId: number, disconnect: boolean): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/presence/register-app-presence",
            requiresAuth: true,
            data: {
                location,
                placeId,
                disconnect
            }
        })
            .catch(error => {
                Promise.reject(error);
            });
    }
}

const Presence = new BasePresence();

export default Presence;

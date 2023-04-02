import Client from "../client";
import Base from "./Base";

export type ContactsMetaData = {
    multiGetContactsMaxSize: number;
    multiGetContactsCacheTTLinMS: number;
};

export type MultiUserTags = {
    targetUserId: number;
    targetUserTag: string;
}[];

export type PostStatus = {
    status: string;
};

export type UserTag = string;

class BaseContacts extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://contacts.roblox.com/",
            client
        });
    }

    getMetaData (): Promise<ContactsMetaData> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/contacts/metadata",
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

    getUserTags (userIds: number[]): Promise<MultiUserTags> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/user/get-tags",
                requiresAuth: true,
                data: {
                    targetUserIds: userIds
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

    setUserTag (userId: number, tag: string): Promise<UserTag> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/user/tag",
                requiresAuth: true,
                data: {
                    targetUserId: userId,
                    userTag: tag
                }
            })
                .then(response => {
                    resolve(response.data.status);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

const Contacts = new BaseContacts();

export default Contacts;

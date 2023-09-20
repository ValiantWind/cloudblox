import querystring from "querystring";
import Base from "./Base";
import Client from "../client";

export type UserInfo = {
    description: string;
    created: Date;
    isBanned: boolean;
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
};

export type UsernameHistory = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        name: string;
    }[];
};

export type ClientUserInfo = {
    id: number;
    name: string;
    displayName: string;
};

export type ClientRoles = {
    roles: string[];
};

export type MultiUserDetailsByUsernames = {
    data: {
        requestedUsername: string;
        hasVerifiedBadge: boolean;
        id: number;
        name: string;
        displayName: string;
    }[];
};

export type MultiUserDetailsByIds = {
    data: {
        hasVerifiedBadge: boolean;
        id: number;
        name: string;
        displayName: string;
    }[];
};

export type UserSearchResults = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        previousUsernames: string[];
        hasVerifiedBadge: boolean;
        id: number;
        name: string;
        displayName: string;
    }[];
};

export type ClientAgeBracket = number;

export type ClientCountryCode = string;

export type UserIdFromName = number;

export type UserDescription = string;

class BaseUser extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://users.roblox.com/",
            client
        });
    }

    async validateDisplayName (displayName: string, birthdate: string): Promise<void> {
        await this.request({
            method: "post",
            path: `v1/display-names/validate?displayName=${displayName}&${querystring.stringify({
                birthdate
            })}`,
            authRequired: false
        }).catch(error => {
            Promise.reject(error);
        });
    }

    async setClientDisplayName (displayName: string): Promise<void> {
        await this.request({
            method: "post",
            path: `v1/users/${this.client.clientUserId}/display-names`,
            authRequired: true,
            data: {
                displayName
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getUserInfo (userId: number): Promise<UserInfo> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}`,
                authRequired: false
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    multiGetUsersByUsernames (usernames: string[], excludeBannedUsers: boolean): Promise<MultiUserDetailsByUsernames> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/usernames/users",
                authRequired: false,
                data: {
                    usernames,
                    excludeBannedUsers
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

    multiGetUsersByIds (userIds: number[], excludeBannedUsers: boolean): Promise<MultiUserDetailsByUsernames> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/users",
                authRequired: false,
                data: {
                    userIds,
                    excludeBannedUsers
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

    getIdFromUsername (username: string): Promise<UserIdFromName> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/usernames/users",
                authRequired: false,
                data: {
                    usernames: [username],
                    excludeBannedUsers: false
                }
            })
                .then(response => {
                    resolve(response.data.data[0].id);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getClientUserInfo (): Promise<ClientUserInfo> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/users/authenticated",
                authRequired: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getUsernameHistory (
        userId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<UsernameHistory> {
        return new Promise((resolve, reject) => {
            if (!sortOrder) {
                sortOrder = "Asc";
            }
            if (!limit) {
                limit = 10;
            }

            this.request({
                method: "get",
                path: `v1/users/${userId}/username-history`,
                authRequired: false,
                params: {
                    sortOrder,
                    limit,
                    cursor
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

    getClientAgeBracket (): Promise<ClientAgeBracket> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/users/authenticated/age-bracket",
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.ageBracket);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getClientCountryCode (): Promise<ClientCountryCode> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/users/authenticated/country-code",
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.countryCode);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getClientRoles (): Promise<ClientRoles> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/users/authenticated/roles",
                authRequired: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    search (keyword: string, limit?: number, cursor?: string): Promise<UserSearchResults> {
        return new Promise((resolve, reject) => {
            if (!limit) {
                limit = 10;
            }

            this.request({
                method: "get",
                path: "v1/users/search",
                authRequired: false,
                params: {
                    keyword,
                    limit,
                    cursor
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

    async getUserDescription (UserId: number): Promise<UserDescription> {
        const description = (await this.getUserInfo(UserId)).description;

        return description;
    }
}

const Users = new BaseUser();
export default Users;

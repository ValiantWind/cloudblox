import Client from "../client";
import Base from "./Base";

export type AccountSettingsMetaData = {
    IsAccountsRestrictionsSpamBugFixEnabled: boolean;
    MaximumParentalControlsMonthlySpendLimitInUSD: boolean;
    IsParentalMonthlyLimitInUIEnabled: boolean;
    IsParentalNotificationSettingsInUIEnabled: boolean;
    IsContentControlsEnabled: boolean;
};

export type ClientBlockedUsers = {
    blockedUsers: {
        userId: number;
        name: string;
        displayName: string;
    }[];
};

export type ClientEmailDetails = {
    emailAddress: string;
    verified: boolean;
    canBypassPasswordForEmailUpdate: boolean;
};

export type UpdatedInventoryPrivacy = {
    inventoryPrivacy: number;
    tradePrivacy: number;
    privacySettingResponse: number;
};

export type UpdatedTradePrivacy = {
    tradePrivacy: number;
    inventoryPrivacy: number;
    privacySettingResponse: number;
};

export type ClientTradeQualityFilter = {
    tradeValue: string;
};

export type ThemeTypes = {
    data: string[];
};

export type ConsumerThemeType = string;

export type ClientAppChatPrivacy = string;
export type ClientGameChatPrivacy = string;
export type ClientInventoryPrivacy = string;
export type ClientPrivateMessagePrivacy = string;
export type ClientTradePrivacy = string;

class BaseAccountSettings extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://accountsettings.roblox.com/",
            client
        });
    }

    getMetaData (): Promise<AccountSettingsMetaData> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/account/settings/metadata",
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

    getClientAppChatPrivacy (): Promise<ClientAppChatPrivacy> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/app-chat-privacy",
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.appChatPrivacy);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async updateClientAppChatPrivacy (appChatPrivacy: 1 | 2 | 3 | 4 | 5 | 6): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/app-chat-privacy",
            authRequired: true,
            data: {
                appChatPrivacy
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getClientGameChatPrivacy (): Promise<ClientGameChatPrivacy> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/game-chat-privacy",
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.gameChatPrivacy);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async updateClientGameChatPrivacy (gameChatPrivacy: 1 | 2 | 3 | 4 | 5 | 6): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/game-chat-privacy",
            authRequired: true,
            data: {
                gameChatPrivacy
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getClientInventoryPrivacy (): Promise<ClientInventoryPrivacy> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/inventory-privacy",
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.inventoryPrivacy);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    updateClientInventoryPrivacy (inventoryPrivacy: 1 | 2 | 3 | 4 | 5 | 6): Promise<UpdatedInventoryPrivacy> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/inventory-privacy",
                authRequired: true,
                data: {
                    inventoryPrivacy
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

    getClientPrivateMessagePrivacy (): Promise<ClientPrivateMessagePrivacy> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/private-message-privacy",
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.privateMessagePrivacy);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async updateClientPrivateMessagePrivacy (privateMessagePrivacy: string): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/private-message-privacy",
            authRequired: true,
            data: {
                privateMessagePrivacy
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getClientTradePrivacy (): Promise<ClientTradePrivacy> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/trade-privacy",
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.tradePrivacy);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    updateClientTradePrivacy (tradePrivacy: number): Promise<UpdatedTradePrivacy> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/trade-privacy",
                authRequired: true,
                data: {
                    tradePrivacy
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

    getClientEmailDetails (): Promise<ClientEmailDetails> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/email",
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

    async updateClientEmailDetails (
        password: string,
        emailAddress: string,
        skipVerificationEmail: boolean,
    ): Promise<void> {
        await this.request({
            method: "patch",
            path: "v1/email",
            authRequired: true,
            data: {
                password,
                emailAddress,
                skipVerificationEmail
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getClientTradeFilter (): Promise<ClientTradeQualityFilter> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/trade-value",
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

    async updateClientTradeFilter (tradeValue: number): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/trade-value",
            authRequired: true,
            data: {
                tradeValue
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    async sendVerificationEmail (freeItem: boolean): Promise<void> {
        await this.request({
            method: "patch",
            path: "v1/email/verify",
            authRequired: true,
            data: {
                freeItem
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getClientBlockedUsers (): Promise<ClientBlockedUsers> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/users/get-detailed-blocked-users",
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

    async blockUser (userId: number): Promise<void> {
        await this.request({
            method: "post",
            path: `v1/users/${userId}/block`,
            authRequired: true
        }).catch(error => {
            Promise.reject(error);
        });
    }

    async unblockUser (userId: number): Promise<void> {
        await this.request({
            method: "post",
            path: `v1/users/${userId}/unblock`,
            authRequired: true
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getConsumerThemeType (consumerId: string): Promise<ConsumerThemeType> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/themes/1/${consumerId}`,
                authRequired: true
            })

                .then(response => {
                    resolve(response.data.themeType);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async updateConsumerThemeType (consumerId: string, themeType: string): Promise<void> {
        await this.request({
            method: "post",
            path: `v1/themes/v1/${consumerId}`,
            authRequired: true,
            data: {
                themeType
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getThemeTypes (): Promise<ThemeTypes> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/themes/types",
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
}
const AccountSettings = new BaseAccountSettings();

export default AccountSettings;

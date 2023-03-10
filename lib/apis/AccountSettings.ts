import axios from "axios";

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

type BaseAccountSettings = {
    getMetaData(): Promise<AccountSettingsMetaData>;
    getClientAppChatPrivacy(): Promise<ClientAppChatPrivacy>;
    updateClientAppChatPrivacy(appChatPrivacy: 1 | 2 | 3 | 4 | 5 | 6): Promise<void>;
    getClientGameChatPrivacy(): Promise<ClientGameChatPrivacy>;
    updateClientGameChatPrivacy(gameChatPrivacy: 1 | 2 | 3 | 4 | 5 | 6): Promise<void>;
    getClientInventoryPrivacy(): Promise<ClientInventoryPrivacy>;
    updateClientInventoryPrivacy(inventoryPrivacy: 1 | 2 | 3 | 4 | 5 | 6): Promise<UpdatedInventoryPrivacy>;
    getClientPrivateMessagePrivacy(): Promise<ClientPrivateMessagePrivacy>;
    updateClientPrivateMessagePrivacy(privateMessagePrivacy: string): Promise<void>;
    getClientTradePrivacy(): Promise<string>;
    updateClientTradePrivacy(tradePrivacy: number): Promise<UpdatedTradePrivacy>;
    getClientEmailDetails(): Promise<ClientEmailDetails>;
    updateClientEmailDetails(password: string, emailAddress: string, skipVerificationEmail: boolean): Promise<void>;
    getClientTradeFilter(): Promise<ClientTradeQualityFilter>;
    updateClientTradeFilter(tradeValue: number): Promise<void>;
    getConsumerThemeType(consumerId: string): Promise<ConsumerThemeType>;
    updateConsumerThemeType(consumerId: string, themeType: string): Promise<void>;
    getThemeTypes(): Promise<ThemeTypes>;
    sendVerificationEmail(freeItem: boolean): Promise<void>;
    getClientBlockedUsers(): Promise<ClientBlockedUsers>;
    blockUser(UserId: number): Promise<void>;
    unblockUser(UserId: number): Promise<void>;
};

const AccountSettings: BaseAccountSettings = {
    getMetaData,
    getClientAppChatPrivacy,
    updateClientAppChatPrivacy,
    getClientGameChatPrivacy,
    updateClientGameChatPrivacy,
    getClientInventoryPrivacy,
    updateClientInventoryPrivacy,
    getClientPrivateMessagePrivacy,
    updateClientPrivateMessagePrivacy,
    getClientTradePrivacy,
    updateClientTradePrivacy,
    getClientEmailDetails,
    updateClientEmailDetails,
    getClientTradeFilter,
    updateClientTradeFilter,
    getConsumerThemeType,
    updateConsumerThemeType,
    getThemeTypes,
    sendVerificationEmail,
    getClientBlockedUsers,
    blockUser,
    unblockUser
};

function getMetaData (): Promise<AccountSettingsMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://accountsettings.roblox.com/v1/account/settings/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientAppChatPrivacy (): Promise<ClientAppChatPrivacy> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://accountsettings.roblox.com/v1/app-chat-privacy`)
            .then(response => {
                resolve(response.data.appChatPrivacy);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function updateClientAppChatPrivacy (appChatPrivacy: 1 | 2 | 3 | 4 | 5 | 6): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios
        .post(`https://accountsettings.roblox.com/v1/app-chat-privacy`, {
            appChatPrivacy
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getClientGameChatPrivacy (): Promise<ClientGameChatPrivacy> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://accountsettings.roblox.com/v1/game-chat-privacy`)
            .then(response => {
                resolve(response.data.gameChatPrivacy);
            })
            .catch(error => {
                reject(error);
            });
    });
}
async function updateClientGameChatPrivacy (gameChatPrivacy: 1 | 2 | 3 | 4 | 5 | 6): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios
        .post(`https://accountsettings.roblox.com/v1/game-chat-privacy`, {
            gameChatPrivacy
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getClientInventoryPrivacy (): Promise<ClientInventoryPrivacy> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://accountsettings.roblox.com/v1/inventory-privacy`)
            .then(response => {
                resolve(response.data.inventoryPrivacy);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function updateClientInventoryPrivacy (inventoryPrivacy: 1 | 2 | 3 | 4 | 5 | 6): Promise<UpdatedInventoryPrivacy> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .post(`https://accountsettings.roblox.com/v1/inventory-privacy`, {
                inventoryPrivacy
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientPrivateMessagePrivacy (): Promise<ClientPrivateMessagePrivacy> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://accountsettings.roblox.com/v1/private-message-privacy`)
            .then(response => {
                resolve(response.data.privateMessagePrivacy);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function updateClientPrivateMessagePrivacy (privateMessagePrivacy: string): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios
        .post(`https://accountsettings.roblox.com/v1/private-message-privacy`, {
            privateMessagePrivacy
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getClientTradePrivacy (): Promise<ClientTradePrivacy> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://accountsettings.roblox.com/v1/trade-privacy`)
            .then(response => {
                resolve(response.data.tradePrivacy);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function updateClientTradePrivacy (tradePrivacy: number): Promise<UpdatedTradePrivacy> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .post(`https://accountsettings.roblox.com/v1/trade-privacy`, {
                tradePrivacy
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientEmailDetails (): Promise<ClientEmailDetails> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://accountsettings.roblox.com/v1/email`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function updateClientEmailDetails (
    password: string,
    emailAddress: string,
    skipVerificationEmail: boolean,
): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios
        .patch(`https://accountsettings.roblox.com/v1/email`, {
            password,
            emailAddress,
            skipVerificationEmail
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getClientTradeFilter (): Promise<ClientTradeQualityFilter> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://accountsettings.roblox.com/v1/trade-value`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function updateClientTradeFilter (tradeValue: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios
        .post(`https://accountsettings.roblox.com/v1/trade-value`, {
            tradeValue
        })
        .catch(error => {
            Promise.reject(error);
        });
}

async function sendVerificationEmail (freeItem: boolean): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios
        .patch(`https://accountsettings.roblox.com/v1/email/verify`, {
            freeItem
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getClientBlockedUsers (): Promise<ClientBlockedUsers> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://accountsettings.roblox.com/v1/users/get-detailed-blocked-users`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function blockUser (UserId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios.post(`https://accountsettings.roblox.com/v1/users/${UserId}/block`).catch(error => {
        Promise.reject(error);
    });
}

async function unblockUser (UserId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios.post(`https://accountsettings.roblox.com/v1/users/${UserId}/unblock`).catch(error => {
        Promise.reject(error);
    });
}

function getConsumerThemeType (consumerId: string): Promise<ConsumerThemeType> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://accountsettings.roblox.com/v1/themes/1/${consumerId}`)
            .then(response => {
                resolve(response.data.themeType);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function updateConsumerThemeType (consumerId: string, themeType: string): Promise<void> {
    axios
        .post(`https://accountsettings.roblox.com/v1/themes/1/${consumerId}`, {
            themeType
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getThemeTypes (): Promise<ThemeTypes> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://accountsettings.roblox.com/v1/themes/types`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default AccountSettings;

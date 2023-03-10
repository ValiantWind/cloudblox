import axios from "axios";
import querystring from "querystring";

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

type BaseUser = {
    validateDisplayName(DisplayName: string, Birthdate: string): Promise<void>;
    setClientDisplayName(DisplayName: string): Promise<void>;
    getUserInfo(UserId: number): Promise<UserInfo>;
    multiGetUsersByUsernames(Usernames: string[], excludeBannedUsers: boolean): Promise<MultiUserDetailsByUsernames>;
    multiGetUsersByIds(UserIds: number[], excludeBannedUsers: boolean): Promise<MultiUserDetailsByUsernames>;
    getIdFromUsername(Username: string): Promise<UserIdFromName>;
    getClientUserInfo(): Promise<ClientUserInfo>;
    getUsernameHistory(
        UserId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<UsernameHistory>;
    getClientAgeBracket(): Promise<ClientAgeBracket>;
    getClientCountryCode(): Promise<ClientCountryCode>;
    getClientRoles(): Promise<ClientRoles>;
    search(keyword: string, limit?: number, cursor?: string): Promise<UserSearchResults>;
};

const Users: BaseUser = {
    validateDisplayName,
    setClientDisplayName,
    getUserInfo,
    multiGetUsersByUsernames,
    multiGetUsersByIds,
    getIdFromUsername,
    getClientUserInfo,
    getUsernameHistory,
    getClientAgeBracket,
    getClientCountryCode,
    getClientRoles,
    search
};

async function validateDisplayName (DisplayName: string, Birthdate: string): Promise<void> {
    await axios
        .post(
            `https://users.roblox.com/v1/display-names/validate?displayName=${DisplayName}&${querystring.stringify({
                birthdate: Birthdate
            })}`,
        )
        .catch(error => {
            Promise.reject(error);
        });
}

async function setClientDisplayName (DisplayName: string): Promise<void> {
    const UserId = (await getClientUserInfo()).id;
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    axios
        .post(`https://users.roblox.com/v1/users/${UserId}/display-names`, {
            newDisplayName: DisplayName
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getUserInfo (UserId: number): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://users.roblox.com/v1/users/${UserId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getIdFromUsername (Username: string): Promise<UserIdFromName> {
    return new Promise((resolve, reject) => {
        axios
            .post(`https://users.roblox.com/v1/usernames/users`, {
                usernames: [Username],
                excludeBannedUsers: false
            })
            .then(response => {
                resolve(response.data.data[0].id);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function multiGetUsersByUsernames (
    Usernames: string[],
    excludeBannedUsers: boolean,
): Promise<MultiUserDetailsByUsernames> {
    return new Promise((resolve, reject) => {
        axios
            .post(`https://users.roblox.com/v1/usernames/users`, {
                usernames: Usernames,
                excludeBannedUsers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function multiGetUsersByIds (UserIds: number[], excludeBannedUsers: boolean): Promise<MultiUserDetailsByUsernames> {
    return new Promise((resolve, reject) => {
        axios
            .post(`https://users.roblox.com/v1/usernames/users`, {
                userIds: UserIds,
                excludeBannedUsers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientUserInfo (): Promise<ClientUserInfo> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://users.roblox.com/v1/users/authenticated`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUsernameHistory (
    UserId: number,
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

        const config = {
            method: "get",
            url: `https://users.roblox.com/v1/users/${UserId}/username-history`,
            params: {
                sortOrder,
                limit,
                cursor
            }
        };

        axios(config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientAgeBracket (): Promise<ClientAgeBracket> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://users.roblox.com/v1/users/authenticated/age-bracket`)
            .then(response => {
                resolve(response.data.ageBracket);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientCountryCode (): Promise<ClientCountryCode> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://users.roblox.com/v1/users/authenticated/country-code`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
            .then(response => {
                resolve(response.data.countryCode);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientRoles (): Promise<ClientRoles> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://users.roblox.com/v1/users/authenticated/roles`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
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

function search (keyword: string, limit?: number, cursor?: string): Promise<UserSearchResults> {
    return new Promise((resolve, reject) => {
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: "https://users.roblox.com/v1/users/search",
            params: {
                keyword,
                limit,
                cursor
            }
        };

        axios(config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default Users;

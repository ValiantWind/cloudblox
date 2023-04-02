import axios from "axios";

export type BadgeInfo = {
    id: number;
    name: string;
    description: string;
    displayName: string;
    displayDescription: string;
    isEnabled: boolean;
    iconImageId: number;
    displayIconImageId: number;
    created: Date;
    updated: Date;
    statistics: {
        pastDayAwardedCount: number;
        awardedCount: number;
        winRatePercentage: number;
    };
    awardingUniverse: {
        id: number;
        name: string;
        rootPlaceId: number;
    };
};

export type BadgeMetaData = {
    badgeCreationPrice: number;
    maxBadgeNameLength: number;
    maxBadgeDescriptionLength: number;
};

export type UserBadges = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: BadgeInfo[];
};

export type UniverseBadges = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: BadgeInfo[];
};

export type FreeBadgesQuota = number;

export type UserBadgeAwardDates = {
    badgeId: number;
    awardedDate: Date;
};

export type NewBadgeDetails = {
    id: number;
    name: string;
    description: string;
    displayName: string;
    displayDescription: string;
    enabled: boolean;
    iconImageId: number;
    displayIconImageId: number;
    awarder: {
        id: number;
        type: number;
        name: string;
    };
    statistics: {
        pastDayAwardedCount: number;
        awardedCount: number;
        winRatePercentage: number;
    };
    created: Date;
    updated: Date;
};

type BaseBadge = {
    getBadgeInfo(BadgeId: number): Promise<BadgeInfo>;
    updateBadgeConfig(BadgeId: number, name: string, description: string, enabled: boolean): Promise<void>;
    getMetaData(): Promise<BadgeMetaData>;
    getUniverseBadges(
        UniverseId: number,
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
        sortOrder?: "Asc" | "Desc",
    ): Promise<UniverseBadges>;
    getUserBadges(UserId: number): Promise<UserBadges>;
    getFreeBadgesQuota(UniverseId: number): Promise<FreeBadgesQuota>;
    getUserBadgeAwardDates(UserId: number, BadgeIds: number[]): Promise<UserBadgeAwardDates[]>;
    removeUserBadge(UserId: number, BadgeId: number): Promise<void>;
    removeClientBadge(BadgeId: number): Promise<void>;
    createBadge(): BadgeBuilder;
};

const Badges: BaseBadge = {
    getBadgeInfo,
    updateBadgeConfig,
    getMetaData,
    getUniverseBadges,
    getUserBadges,
    getFreeBadgesQuota,
    getUserBadgeAwardDates,
    removeUserBadge,
    removeClientBadge,
    createBadge
};

function getBadgeInfo (BadgeId: number): Promise<BadgeInfo> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://badges.roblox.com/v1/badges/${BadgeId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function updateBadgeConfig (BadgeId: number, name: string, description: string, enabled: boolean): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .patch(`https://badges.roblox.com/v1/badges/${BadgeId}`, {
            name,
            description,
            enabled
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getMetaData (): Promise<BadgeMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://badges.roblox.com/v1/badges/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUniverseBadges (
    UniverseId: number,
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
    sortOrder?: "Asc" | "Desc",
): Promise<UniverseBadges> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://badges.roblox.com/v1/universes/${UniverseId}/badges`,
            params: {
                limit,
                cursor,
                sortOrder
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

function getUserBadges (UserId: number): Promise<UserBadges> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://badges.roblox.com/v1/users/${UserId}/badges`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getFreeBadgesQuota (UniverseId: number): Promise<FreeBadgesQuota> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://badges.roblox.com/v1/universes/${UniverseId}/free-badges-quota`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserBadgeAwardDates (UserId: number, BadgeIds: number[]): Promise<UserBadgeAwardDates[]> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://badges.roblox.com/v1/users/${UserId}/badges/awarded-dates?badgeIds=${BadgeIds.join(",")}`)
            .then(response => {
                resolve(response.data.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function removeUserBadge (UserId: number, BadgeId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.delete(`https://badges.roblox.com/v1/user/${UserId}/badges/${BadgeId}`).catch(error => {
        Promise.reject(error);
    });
}

async function removeClientBadge (BadgeId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.delete(`https://badges.roblox.com/v1/user/badges/${BadgeId}`).catch(error => {
        Promise.reject(error);
    });
}

function createBadge (): BadgeBuilder {
    return new BadgeBuilder();
}

class BadgeBuilder {
    public name: string;
    public description: string;
    public paymentSourceType: 1 | 2;
    public files: File;
    public expectedCost: number;
    public UniverseId: number;

    constructor () {
        this.create();
    }

    setName (name: string) {
        this.name = name;
        return this;
    }

    setDescription (description: string) {
        this.description = description;
        return this;
    }

    setPaymentSourceType (paymentSourceType: "User" | "Group") {
        if (paymentSourceType === "User") {
            this.paymentSourceType = 1;
        } else if (paymentSourceType === "Group") {
            this.paymentSourceType = 2;
        } else {
            throw new Error("Invalid payment source type");
        }
        return this;
    }

    setBadgeIcon (file: File) {
        this.files = file;
        return this;
    }

    setAwardingUniverse (UniverseId: number) {
        this.UniverseId = UniverseId;
        return this;
    }

    create (): Promise<NewBadgeDetails> {
        return new Promise((resolve, reject) => {
            if (!axios.defaults.headers.common.Cookie) {
                reject(new Error("No cookie has been set."));
            }

            const config = {
                method: "post",
                url: `https://badges.roblox.com/v1/universes/${this.UniverseId}/badges`,
                params: {
                    name: this.name,
                    description: this.description,
                    paymentSourceType: this.paymentSourceType,
                    files: this.files,
                    expectedCost: this.expectedCost
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
}

export default Badges;

import axios from "axios";
import Base from "./Base";
import Client from "../client";

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

class BaseBadge extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://badges.roblox.com/",
            client
        });
    }

    getBadgeInfo (badgeId: number): Promise<BadgeInfo> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/badges/${badgeId}`,
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

    async updateBadgeConfig (badgeId: number, name: string, description: string, enabled: boolean): Promise<void> {
        await this.request({
            method: "patch",
            path: `v1/badges/${badgeId}`,
            authRequired: true,
            data: {
                name,
                description,
                enabled
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getMetaData (): Promise<BadgeMetaData> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/badges/metadata",
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

    getUniverseBadges (
        universeId: number,
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

            this.request({
                method: "get",
                path: `v1/universes/${universeId}`,
                authRequired: false,
                params: {
                    limit,
                    cursor,
                    sortOrder
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

    getUserBadges (userId: number): Promise<UserBadges> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/badges`,
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

    getFreeBadgesQuota (universeId: number): Promise<FreeBadgesQuota> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/universes/${universeId}/free-badges-quota`,
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

    async removeUserBadge (userId: number, badgeId: number): Promise<void> {
        await this.request({
            method: "delete",
            path: `v1/user/${userId}/badges/${badgeId}`,
            authRequired: true
        }).catch(error => {
            Promise.reject(error);
        });
    }

    async removeClientBadge (badgeId: number): Promise<void> {
        await this.request({
            method: "delete",
            path: `v1/user/badges/${badgeId}`,
            authRequired: true
        }).catch(error => {
            Promise.reject(error);
        });
    }

    createBadge (): BadgeBuilder {
        return new BadgeBuilder();
    }
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

const Badges = new BaseBadge();

export default Badges;

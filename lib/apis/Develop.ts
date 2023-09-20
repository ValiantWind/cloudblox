import Base from "./Base";
import Client from "../client";

export type AssetInfo = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        Id: number;
        assetId: number;
        assetVersionNumber: number;
        creatorType: string;
        creatorTargetId: number;
        creatingUniverseId: number;
        created: Date;
        isEqualToCurrentPublishedVersion: boolean;
        isPublished: boolean;
    }[];
};

export type PlaceConfig = {
    maxPlayerCount: number;
    socialSlotType: string;
    customSocialSlotsCount: number;
    allowCopying: boolean;
    currentSavedVersion: number;
    isAllGenresAllowed: boolean;
    allowedGearTypes: string[];
    maxPlayersAllowed: number;
    id: number;
    universeId: number;
    name: string;
    description: string;
    isRootPlace: boolean;
};

export type GameTemplates = {
    data: {
        gameTemplateType: string;
        hasTutorials: boolean;
        universe: {
            id: number;
            name: string;
            description: string | null;
            isArchived: boolean;
            rootPlaceId: number;
            isActive: boolean;
            privacyType: string;
            creatorType: string;
            creatorTargetId: number;
            creatorName: string;
            updated: Date;
            created: Date;
        };
    }[];
};

export type UniverseInfo = {
    id: number;
    name: string;
    description: string;
    isArchived: boolean;
    rootPlaceId: number;
    isActive: boolean;
    privacyType: string;
    creatorType: string;
    creatorTargetId: number;
    creatorName: string;
    created: Date;
    updated: Date;
};

export type UniverseConfigOptions = {
    allowPrivateServers: boolean;
    privateServerPrice: number;
    name: string;
    description: string;
    universeAvatarType: string;
    universeAnimationType: string;
    universeCollisionType: string;
    universeJointPositioningType: string;
    isArchived: boolean;
    isFriendsOnly: boolean;
    genre: string;
    playableDevices: string[];
    isForSale: boolean;
    price: number;
    universeAvatarAssetOverrides: {
        assetID: number;
        assetTypeID: number;
        isPlayerChoice: boolean;
    }[];
    universeAvatarMinScales: {
        height: number;
        width: number;
        head: number;
        depth: number;
        proportion: number;
        bodyType: number;
    };
    studioAccessToApisAllowed: boolean;
    permissions: {
        IsThirdPartyTeleportAllowed: boolean;
        IsThirdPartyAssetAllowed: boolean;
        IsThirdPartyPurchaseAllowed: boolean;
    };
    optInRegions: string[];
    optOutRegions: string[];
};

export type UpdatedUniverseConfig = {
    allowPrivateServers: boolean;
    privateServerPrice: number;
    optInRegions: {
        region: string;
        status: string;
    }[];
    id: number;
    name: string;
    description: string;
    universeAvatarType: string;
    universeAnimationType: string;
    universeCollisionType: string;
    universeJointPositioningType: string;
    isArchived: boolean;
    isFriendsOnly: boolean;
    genre: string;
    playableDevices: string[];
    isForSale: boolean;
    price: number;
    universeAvatarAssetOverrides: {
        assetID: number;
        assetTypeID: number;
        isPlayerChoice: boolean;
    }[];
    universeAvatarMinScales: {
        height: number;
        width: number;
        head: number;
        depth: number;
        proportion: number;
        bodyType: number;
    };
    universeAvatarMaxScales: {
        height: number;
        width: number;
        head: number;
        depth: number;
        proportion: number;
        bodyType: number;
    };
    studioAccessToApisAllowed: boolean;
    permissions: {
        IsThirdPartyTeleportAllowed: boolean;
        IsThirdPartyAssetAllowed: boolean;
        IsThirdPartyPurchaseAllowed: boolean;
    };
};

export type CanManage = {
    Success: boolean;
    CanManage: boolean;
};

export type UniverseIdFromPlaceId = number;

export type AssetVotingInfo = {
    assetId: number;
    hasUserVoted: boolean;
    canUserVote: boolean;
    shouldShowVotes: boolean;
    upVotes: number;
    downVotes: number;
    reasonForNotAbleToVote: string;
};

export type GameUpdateMessages = {
    universeId: number;
    createdOn: Date;
    createdOnKey: string;
    creatorType: string;
    creatorId: number;
    creatorName: string;
    expiredOn: Date;
    content: string;
    impressions: number;
    plays: number;
    unfollows: number;
};

export type GameUpdateMessageDetails = GameUpdateMessages;

export type GroupUniverses = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        id: number;
        name: string;
        description: string;
        isArchived: boolean;
        rootPlaceId: number;
        isActive: boolean;
        privacyType: string;
        creatorType: string;
        creatorTargetId: number;
        creatorName: string;
        created: Date;
        updated: Date;
    }[];
};

export type PlaceCompatibilities = {
    Compatibilities: {
        status: string;
        platformName: string;
        crashRatePercentage: number;
    }[];
};

export type PlaceStatistics = {
    placeId: number;
    dataType: string;
    dataGranularity: string;
    startTime: Date;
    endTime: Date;
    data: object;
};

export type CreatorDashboardMetaData = {
    isPlayFabDataSourceChartsEnabled: boolean;
    playFabDataSourceChartsAvailableByKPITypes: string[];
};

export type PlaceAgeDataAvailability = boolean;

export type FilteredTextDetails = {
    filteredGameUpdateText: string;
    isFiltered: boolean;
    moderationLevel: number;
};

class BaseDevelop extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: `https://develop.roblox.com/`,
            client
        });
    }

    getAssetInfo (
        assetId: number,
        placeId: number,
        sortOrder?: "Desc" | "Asc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<AssetInfo> {
        return new Promise((resolve, reject) => {
            if (!sortOrder) {
                sortOrder = "Asc";
            }
            if (!limit) {
                limit = 10;
            }
            this.request({
                method: "get",
                path: `v2/assets/${assetId}/versions`,
                authRequired: true,
                params: {
                    placeId,
                    sortOrder,
                    limit,
                    cursor
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(e => {
                    reject(e);
                });
        });
    }

    getPlaceConfig (placeId: number): Promise<PlaceConfig> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v2/place/${placeId}`,
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

    async updatePlaceConfig (placeId: number, placeConfig: PlaceConfig): Promise<void> {
        await this.request({
            method: "post",
            path: `v2/places/${placeId}`,
            authRequired: true,
            data: {
                configuration: placeConfig
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getGameTemplates (): Promise<GameTemplates> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/gametemplates`,
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

    getUniverseInfo (universeId: number): Promise<UniverseInfo> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/universes/${universeId}`,
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

    canManageAsset (userId: number, assetId: number): Promise<CanManage> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/user/${userId}/canmanage/${assetId}`,
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

    getUniverseIdFromPlace (placeId: number): Promise<UniverseIdFromPlaceId> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/places/${placeId}/universe`,
                authRequired: false
            })
                .then(response => {
                    resolve(response.data.universeId);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAssetVotingInfo (assetIds: number[]): Promise<AssetVotingInfo[]> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/assets/voting?assetIds=${assetIds.join(",")}`,
                authRequired: false
            })
                .then(response => {
                    resolve(response.data.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getGameUpdateMessages (universeId: number): Promise<GameUpdateMessages[]> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/gameUpdateNotifications/${universeId}`,
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

    publishGameUpdateMessage (universeId: number, message: string): Promise<GameUpdateMessageDetails> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: `v1/gameUpdateNotifications/${universeId}`,
                authRequired: true,
                data: {
                    gameUpdateText: message
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

    filterText (text: string): Promise<FilteredTextDetails> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/gameUpdateNotifications/filter",
                authRequired: true,
                data: {
                    gameUpdateText: text
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

    updateUniverseConfig (universeId: number, universeConfig: UniverseConfigOptions): Promise<UpdatedUniverseConfig> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "patch",
                path: `v2/universes/${universeId}/configuration`,
                authRequired: true,
                data: {
                    UniverseConfig: universeConfig
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

    async closeTeamTest (placeId: number, gameInstanceId: string): Promise<void> {
        await this.request({
            method: "delete",
            path: `v2/teamtest/${placeId}`,
            authRequired: true,
            params: {
                gameId: gameInstanceId
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getGroupUniverses (
        groupId: number,
        sortOrder = "Asc",
        limit = 10,
        isArchived = false,
        cursor?: string,
    ): Promise<GroupUniverses> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/groups/${groupId}/universes`,
                authRequired: false,
                params: {
                    isArchived,
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

    getPlaceCompatibilities (placeId: number): Promise<PlaceCompatibilities> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/places/${placeId}/compatibilities`,
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

    getPlaceStatistics (
        placeId: number,
        type: "Revenue" | "RevenuePerVisit" | "AverageVisitLength" | "Visits",
        granularity: "Hourly" | "Daily" | "Monthly",
        divisionType?: "Device" | "Age",
        startTime?: string,
        endTime?: string,
    ): Promise<PlaceStatistics> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/places/${placeId}/stats/${type}`,
                authRequired: true,
                params: {
                    granularity,
                    divisionType,
                    startTime,
                    endTime
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

    getCreatorDashboardMetaData (): Promise<CreatorDashboardMetaData> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/stats/creator-dashboard-metadata`,
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

    isPlaceAgeDataAvailable (placeId: number): Promise<PlaceAgeDataAvailability> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/places/${placeId}/stats/is-age-data-available`,
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.isAgeDataAvailable);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

const Develop = new BaseDevelop();

export default Develop;

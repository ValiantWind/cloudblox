import axios from "axios";

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

export type PlaceConfiguration = {
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
    data: object
};

export type CreatorDashboardMetaData = {
    isPlayFabDataSourceChartsEnabled: boolean;
    playFabDataSourceChartsAvailableByKPITypes: string[];
};

type BaseDevelop = {
    getAssetInfo(
        AssetId: number,
        PlaceId?: number,
        sortOrder?: "Desc" | "Asc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<AssetInfo>;
    getPlaceConfig(PlaceId: number): Promise<PlaceConfiguration>;
    updatePlaceConfig(PlaceId: number, PlaceConfig: PlaceConfiguration): Promise<void>;
    getGameTemplates(): Promise<GameTemplates>;
    updateUniverseConfig(UniverseId: number, UniverseConfig: UniverseConfigOptions): Promise<UpdatedUniverseConfig>;
    getUniverseInfo(UniverseId: number): Promise<UniverseInfo>;
    canManageAsset(UserId: number, AssetId: number): Promise<CanManage>;
    getUniverseIdFromPlaceId(PlaceId: number): Promise<UniverseIdFromPlaceId>;
    getAssetVotingInfo(AssetIds: number[]): Promise<AssetVotingInfo[]>;
    getGameUpdateMessages(UniverseId: number): Promise<GameUpdateMessages[]>;
    publishGameUpdateMessage(UniverseId: number, Message: string): Promise<GameUpdateMessageDetails>;
    filterText(Text: string): Promise<void>;
    closeTeamTest(PlaceId: number, GameId: number): Promise<void>;
    getGroupUniverses(
        GroupId: number,
        isArchived?: boolean,
        sortOrder?: string,
        limit?: number,
        cursor?: string,
    ): Promise<GroupUniverses>;
    getPlaceCompatibilites(PlaceId: number): Promise<PlaceCompatibilities>;
    getPlaceStatistics(
        PlaceId: number,
        type: "Revenue" | "RevenuePerVisit" | "AverageVisitLength" | "Visits",
        granularity: "Hourly" | "Daily" | "Monthly",
        divisionType?: "Device" | "Age",
        startTime?: string,
        endTime?: string,
    ): Promise<PlaceStatistics>;
    getCreatorDashboardMetaData (): Promise<CreatorDashboardMetaData>
};

const Develop: BaseDevelop = {
    getAssetInfo,
    getPlaceConfig,
    updatePlaceConfig,
    getGameTemplates,
    updateUniverseConfig,
    getUniverseInfo,
    canManageAsset,
    getUniverseIdFromPlaceId,
    getAssetVotingInfo,
    getGameUpdateMessages,
    publishGameUpdateMessage,
    filterText,
    closeTeamTest,
    getGroupUniverses,
    getPlaceCompatibilites,
    getPlaceStatistics,
    getCreatorDashboardMetaData,
	
	
	
};

function getAssetInfo (
    AssetId: number,
    PlaceId?: number,
    sortOrder?: "Desc" | "Asc",
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
): Promise<AssetInfo> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }

        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://develop.roblox.com/v2/assets/${AssetId}/versions`,
            params: {
                PlaceId,
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

function getPlaceConfig (PlaceId: number): Promise<PlaceConfiguration> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://develop.roblox.com/v2/places/${PlaceId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function updatePlaceConfig (PlaceId: number, PlaceConfig: PlaceConfiguration): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://develop.roblox.com/v2/places/${PlaceId}`, {
            configuration: PlaceConfig
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getGameTemplates (): Promise<GameTemplates> {
    return new Promise((resolve, reject) => {
        axios
            .get(`${this.baseUrl}/v1/gametemplates`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUniverseInfo (UniverseId: number): Promise<UniverseInfo> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://develop.roblox.com/v1/universes/${UniverseId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function canManageAsset (UserId: number, AssetId: number): Promise<CanManage> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://develop.roblox.com/v1/user/${UserId}/canmanage/${AssetId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUniverseIdFromPlaceId (PlaceId: number): Promise<UniverseIdFromPlaceId> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://apis.roblox.com/universes/v1/places/${PlaceId}/universe`)
            .then(response => {
                resolve(response.data.universeId);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAssetVotingInfo (AssetIds: number[]): Promise<AssetVotingInfo[]> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://develop.roblox.com/v1/assets/voting?assetIds=${AssetIds.join(",")}`)
            .then(response => {
                resolve(response.data.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getGameUpdateMessages (UniverseId: number): Promise<GameUpdateMessages[]> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://develop.roblox.com/v1/gameUpdateNotifications/${UniverseId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function publishGameUpdateMessage (UniverseId: number, Message: string): Promise<GameUpdateMessageDetails> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .post(`https://develop.roblox.com/v1/gameUpdateNotifications/${UniverseId}`, {
                gameUpdateText: Message
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function filterText (Text: string): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://develop.roblox.com/v1/gameUpdateNotifications/filter`, {
            gameUpdateText: Text
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function updateUniverseConfig (
    UniverseId: number,
    UniverseConfig: UniverseConfigOptions,
): Promise<UpdatedUniverseConfig> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        const config = {
            method: "patch",
            url: `https://develop.roblox.com/v2/universes/${UniverseId}/configuration`,
            params: {
                UniverseConfig
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

async function closeTeamTest (PlaceId: number, GameId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }

    const config = {
        method: "delete",
        url: `https://develop.roblox.com/v2/teamtest/${PlaceId}`,
        params: {
            gameId: GameId
        }
    };
    await axios(config).catch(error => {
        Promise.reject(error);
    });
}

function getGroupUniverses (
    GroupId: number,
    isArchived?: boolean,
    sortOrder?: string,
    limit?: number,
    cursor?: string,
): Promise<GroupUniverses> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://develop.roblox.com/v1/groups/${GroupId}/universes`,
            params: {
                isArchived,
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

function getPlaceCompatibilites (PlaceId: number): Promise<PlaceCompatibilities> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://develop.roblox.com/v1/places/${PlaceId}/compatibilities`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getPlaceStatistics (
    PlaceId: number,
    type: "Revenue" | "RevenuePerVisit" | "AverageVisitLength" | "Visits",
    granularity: "Hourly" | "Daily" | "Monthly",
    divisionType?: "Device" | "Age",
    startTime?: string,
    endTime?: string,
): Promise<PlaceStatistics> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }

        if (!granularity) {
            granularity = "Hourly";
        }

        const config = {
            method: "get",
            url: `https://develop.roblox.com/v1/places/${PlaceId}/stats/${type}`,
            params: {
                granularity,
                divisionType,
                startTime,
                endTime
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

function getCreatorDashboardMetaData (): Promise<CreatorDashboardMetaData> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }

        axios
            .get(`https://develop.roblox.com/v1/stats/creator-dashboard-metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default Develop;

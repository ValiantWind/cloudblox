import axios from "axios";

export type Scale = {
    min: number;
    max: number;
    increment: number;
};

export type BodyScales = {
    height: number;
    width: number;
    head: number;
    depth: number;
    proportion: number;
    bodyType: number;
};

export type AvatarBodyColors = {
    headColorId: number;
    torsoColorId: number;
    rightArmColorId: number;
    leftArmColorId: number;
    rightLegColorId: number;
    leftLegColorId: number;
};

export type ColorPalette = {
    brickColorId: number;
    hexColor: string;
    name: string;
};

export type AvatarMetaData = {
    enableDefaultClothingMessage: boolean;
    isAvatarScaleEmbeddedInTab: boolean;
    isBodyTypeScaleOutOfTab: boolean;
    scaleHeightIncrement: number;
    scaleWidthIncrement: number;
    scaleHeadIncrement: number;
    scaleProportionIncrement: number;
    scaleBodyTypeIncrement: number;
    supportProportionAndBodyType: boolean;
    showDefaultClothingMessageOnPageLoad: boolean;
    areThreeDeeThumbsEnabled: boolean;
};

export type AvatarRules = {
    playerAvatarTypes: ("R6" | "R15" | string)[];
    scales: {
        height: Scale;
        width: Scale;
        head: Scale;
        bodyType: Scale;
    };
    wearableAssetTypes: {
        maxNumber: number;
        id: number;
        name: string;
    }[];
    bodyColorsPalette: ColorPalette[];
    basicBodyColorsPalette: ColorPalette[];
    minimumDeltaEBodyColorDifference: number;
    proportionsAndBodyTypeEnabledForUser: boolean;
    defaultClothingAssetLists: {
        defaultShirtAssetIds: number[];
        defaultPantAssetIds: number[];
    };
    bundlesEnabledForUser: boolean;
    emotesEnabledForUser: boolean;
};

export type UserOutfits = {
    filteredCount: number;
    data: {
        id: number;
        name: string;
        isEditable: boolean;
    }[];
    total: number;
};

export type UserCurrentlyWearing = {
    assetIds: number[];
};

export type UserAvatarDetails = {
    scales: BodyScales;
    playerAvatarType: "R6" | "R15" | string;
    bodyColors: AvatarBodyColors;
    assets: {
        id: number;
        name: string;
        assetType: {
            id: number;
            name: string;
        };
    }[];
    defaultShirtApplied: boolean;
    defaultPantsApplied: boolean;
    emotes: {
        assetId: number;
        assetName: string;
        position: number;
    }[];
};

export type ClientAvatarDetails = UserAvatarDetails;

export type OutfitDetails = {
    id: number;
    name: string;
    assets: {
        id: number;
        name: string;
        assetType: {
            id: number;
            name: string;
        };
    }[];
    bodyColors: AvatarBodyColors;
    scale: BodyScales;
    playerAvatarType: string;
    outfitType: string;
    isEditable: boolean;
};

export type AvatarGameStartInfo = {
    gameAvatarType: string;
    allowCustomAnimations: string;
    universeAvatarCollisionType: string;
    universeAvatarBodyType: string;
    jointPositioningType: string;
    message: string;
    universeAvatarMinScales: BodyScales;
    universeAvatarMaxScales: BodyScales;
    universeAvatarAssetOverrides: {
        assetID: number;
        assetTypeID: number;
        isPlayerChoice: boolean;
    }[];
    moderationStatus: string;
};

export type OutfitInvalidAssets = {
    invalidAssets: {
        id: number;
        name: string;
        assetType: {
            id: number;
            name: string;
        };
        currentVersionId: number;
        meta: {
            order: number;
            puffiness: number;
            version: number;
        };
    }[];
    invalidAssetIds: number[];
    success: boolean;
};

export type NewOutfitOptions = {
    name: string;
    bodyColors: AvatarBodyColors;
    assets: {
        id: number;
        meta: {
            order: number;
            puffiness: number;
            version: number;
        };
    }[];
    scale: BodyScales;
    playerAvatarType: string;
    outfitType: number;
};

export type UpdatedOutfitResults = {
    id: number;
    name: string;
    isEditable: boolean;
};

export type RecentItems = {
    data: {
        id: number;
        name: string;
        type: number;
        assetType: {
            id: number;
            name: string;
        };
        isEditable: boolean;
    }[];
    total: number;
};

export type AssetIdParams = {
    assets: {
        id: number;
        meta: {
            order: number;
            puffiness: number;
            version: number;
        };
    }[];
};

export type PossibleInvalidAssets = {
    invalidAssets: {
        id: number;
        name: string;
        assetType: {
            id: number;
            name: string;
        };
        currentVersionId: number;
        meta: {
            order: number;
            puffiness: number;
            version: number;
        };
    }[];
    invalidAssetIds: number[];
    success: boolean;
};

type BaseAvatar = {
    getUserAvatar(UserId: number): Promise<UserAvatarDetails>;
    getUserCurrentlyWearing(UserId: number): Promise<UserCurrentlyWearing>;
    removeClientAsset(AssetId: number): Promise<boolean>;
    getClientAvatar(): Promise<ClientAvatarDetails>;
    getUserOutfits(UserId: number): Promise<UserOutfits>;
    setClientBodyScales(
        height: number,
        width: number,
        head: number,
        depth: number,
        proportion: number,
        bodyType: number,
    ): Promise<boolean>;
    setClientAvatarType(AvatarType: "R6" | "R15"): Promise<boolean>;
    getAvatarRules(): Promise<AvatarRules>;
    getMetaData(): Promise<AvatarMetaData>;
    getGameStartInfo(UniverseId: number): Promise<AvatarGameStartInfo>;
    redrawClientThumbnail(): Promise<void>;
    setClientBodyColors(BodyColors: AvatarBodyColors): Promise<boolean>;
    getOutfitDetails(OutfitId: number): Promise<OutfitDetails>;
    deleteClientOutfit(OutfitId: number): Promise<boolean>;
    wearClientOutfit(OutfitId: number): Promise<OutfitInvalidAssets>;
    createClientOutfit(OutfitOptions: NewOutfitOptions): Promise<void>;
    updateClientOutfit(OutfitId: number, OutfitOptions: NewOutfitOptions): Promise<UpdatedOutfitResults>;
    getRecentItems(RecentItemListType: 0 | 1 | 2 | 3 | 4 | 5 | 6): Promise<RecentItems>;
    setWearingAssets(assetIdParams: AssetIdParams): Promise<PossibleInvalidAssets>;
};

const Avatar: BaseAvatar = {
    getUserAvatar,
    getUserCurrentlyWearing,
    removeClientAsset,
    getClientAvatar,
    getUserOutfits,
    setClientBodyScales,
    setClientAvatarType,
    getAvatarRules,
    getMetaData,
    getGameStartInfo,
    redrawClientThumbnail,
    setClientBodyColors,
    getOutfitDetails,
    deleteClientOutfit,
    wearClientOutfit,
    createClientOutfit,
    updateClientOutfit,
    getRecentItems,
    setWearingAssets
};

function getUserAvatar (UserId: number): Promise<UserAvatarDetails> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://avatar.roblox.com/v1/users/${UserId}/avatar`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserCurrentlyWearing (UserId: number): Promise<UserCurrentlyWearing> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://avatar.roblox.com/v1/users/${UserId}/currently-wearing`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientAvatar (): Promise<ClientAvatarDetails> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://avatar.roblox.com/v1/avatar`, {
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

function removeClientAsset (AssetId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .post(`https://avatar.roblox.com/v1/avatar/assets/${AssetId}/remove`, {
                headers: {
                    Accept: "application/json"
                }
            })
            .then(response => {
                resolve(response.data.success);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserOutfits (UserId: number): Promise<UserOutfits> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://avatar.roblox.com/v1/users/${UserId}/outfits`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function setClientBodyScales (
    height: number,
    width: number,
    head: number,
    depth: number,
    proportion: number,
    bodyType: number,
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .post(`https://avatar.roblox.com/v1/avatar/set-scales`, {
                height,
                width,
                head,
                depth,
                proportion,
                bodyType
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function setClientAvatarType (AvatarType: "R6" | "R15"): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let avatarType: number;
        if (AvatarType === "R6") {
            avatarType = 1;
        } else if (AvatarType === "R15") {
            avatarType = 3;
        }
        axios
            .post(`https://avatar.roblox.com/v1/avatar/set-player-avatar-type`, {
                playerAvatarType: avatarType
            })
            .then(response => {
                resolve(response.data.success);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAvatarRules (): Promise<AvatarRules> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://avatar.roblox.com/v1/avatar-rules`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getMetaData (): Promise<AvatarMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://avatar.roblox.com/v1/avatar/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getGameStartInfo (UniverseId: number): Promise<AvatarGameStartInfo> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://avatar.roblox.com/v1/game-start-info?universeId=${UniverseId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function redrawClientThumbnail (): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios.post(`https://avatar.roblox.com/v1/avatar/redraw-thumbnail`).catch(error => {
        Promise.reject(error);
    });
}

async function setClientBodyColors (BodyColors: AvatarBodyColors): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .post(`https://avatar.roblox.com/v1/avatar/set-body-colors`, {
                BodyColors
            })
            .then(response => {
                resolve(response.data.success);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getOutfitDetails (OutfitId: number): Promise<OutfitDetails> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://avatar.roblox.com/v1/outfits/${OutfitId}/details`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function deleteClientOutfit (OutfitId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        axios
            .post(`https://avatar.roblox.com/v1/outfits/${OutfitId}/delete`)
            .then(response => {
                resolve(response.data.success);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function wearClientOutfit (OutfitId: number): Promise<OutfitInvalidAssets> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .post(`https://avatar.roblox.com/v1/outfits/${OutfitId}/wear`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function createClientOutfit (OutfitOptions: NewOutfitOptions): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject("No cookie has been set.");
    }
    axios
        .post(`https://avatar.roblox.com/v2/outfits/create`, {
            outfitUpdateModel: OutfitOptions
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function updateClientOutfit (OutfitId: number, OutfitOptions: NewOutfitOptions): Promise<UpdatedOutfitResults> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .patch(`https://avatar.roblox.com/v2/outfits/${OutfitId}`, {
                outfitUpdateModel: OutfitOptions
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getRecentItems (RecentItemListType: 0 | 1 | 2 | 3 | 4 | 5 | 6): Promise<RecentItems> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://avatar.roblox.com/v1/recent-items/${RecentItemListType}/list`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function setWearingAssets (assetIdParams: AssetIdParams): Promise<PossibleInvalidAssets> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .post(`https://avatar.roblox.com/v2/avatar/set-wearing-assets`, {
                wearRequestModel: assetIdParams
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default Avatar;

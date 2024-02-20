import Client from "../client";
import Base from "./Base";

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

class BaseAvatar extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://avatar.roblox.com/",
            client
        });
    }

    getUserAvatar (userId: number): Promise<UserAvatarDetails> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/avatar`,
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

    getUserCurrentlyWearing (userId: number): Promise<UserCurrentlyWearing> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/currently-wearing`,
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

    getClientAvatar (): Promise<ClientAvatarDetails> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/avatar",
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

    removeClientAsset (assetId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/avatar/assets/${assetId}/remove`,
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.success);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getUserOutfits (userId: number): Promise<UserOutfits> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/outfits`,
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

    setClientBodyScales (
        height: number,
        width: number,
        head: number,
        depth: number,
        proportion: number,
        bodyType: number,
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/avatar/set-scales",
                authRequired: true,
                data: {
                    height,
                    width,
                    head,
                    depth,
                    proportion,
                    bodyType
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

    setClientAvatarType (avatarType: "R6" | "R15"): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let AvatarType: number;
            if (avatarType === "R6") {
                AvatarType = 1;
            } else if (avatarType === "R15") {
                AvatarType = 3;
            }

            this.request({
                method: "post",
                path: "v1/avatar/set-player-avatar-type",
                authRequired: true,
                data: {
                    playerAvatarType: AvatarType
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

    getAvatarRules (): Promise<AvatarRules> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/avatar-rules",
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

    getMetaData (): Promise<AvatarMetaData> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/avatar/metadata",
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

    getGameStartInfo (universeId: number): Promise<AvatarGameStartInfo> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/game-start-info?universeId=${universeId}`,
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

    async redrawClientThumbnail (): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/avatar/redraw-thumbnail",
            authRequired: true
        }).catch(error => {
            Promise.reject(error);
        });
    }

    setClientBodyColors (bodyColors: AvatarBodyColors): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/avatar/set-body-colors",
                authRequired: true,
								data: {
									bodyColors
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

    getOutfitDetails (outfitId: number): Promise<OutfitDetails> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/outfits/${outfitId}/details`,
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

    deleteClientOutfit (outfitId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: `v1/outfits/${outfitId}/delete`,
                authRequired: true
            })
                .then(response => {
                    resolve(response.data.success);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    wearClientOutfit (outfitId: number): Promise<OutfitInvalidAssets> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: `v1/outfits/${outfitId}/wear`,
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

    async createClientOutfit (outfitOptions: NewOutfitOptions): Promise<void> {
        await this.request({
            method: "post",
            path: `v2/outfits/create`,
            authRequired: true,
            data: {
                outfitUpdateModel: outfitOptions
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    updateClientOutfit (outfitId: number, outfitOptions: NewOutfitOptions): Promise<UpdatedOutfitResults> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "patch",
                path: `v2/outfits/${outfitId}`,
                authRequired: true,
                data: {
                    outfitUpdateModel: outfitOptions
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

    getRecentItems (recentItemListType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | number): Promise<RecentItems> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/recent-items/${recentItemListType}/list`,
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

    setWearingAssets (assetIdParams: AssetIdParams): Promise<PossibleInvalidAssets> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v2/avatar/set-wearing-assets",
                authRequired: true,
                data: {
                    wearRequestModel: assetIdParams
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
}

const Avatar = new BaseAvatar();
export default Avatar;

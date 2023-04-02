import Client from "../client";
import Base from "./Base";

export type AssetThumbnail3D = {
    targetId: number;
    state: string;
    imageUrl: string;
};

export type AnimatedAssetThumbnail = AssetThumbnail3D;

export type AvatarThumbnail3D = {
    targetId: number;
    state: string;
    imageUrl: string;
};

export type BadgeIcon = {
    targetId: number;
    state: string;
    imageUrl: string;
}

export type BundleThumbnail = BadgeIcon;

export type ThumbnailMetaData = {
    isWebappUseCacheEnabled: boolean;
    webappCacheExpirationTimspan: string;
};

class BaseThumbnails extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://thumbnails.roblox.com/",
            client
        });
    }

    get3dAsset (assetId: number): Promise<AssetThumbnail3D> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/assets-thumbnail-3d",
                requiresAuth: false,
                params: {
                    assetId
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

    getAnimatedAsset (assetId: number): Promise<AssetThumbnail3D> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/asset-thumbnail-animated",
                requiresAuth: false,
                params: {
                    assetId
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

    get3dAvatar (userId: number): Promise<AssetThumbnail3D> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/users/avatar-3d",
                requiresAuth: false,
                params: {
                    userId
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

    getMetaData (): Promise<AssetThumbnail3D> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/metadata",
                requiresAuth: false
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getBadgeIcon (badgeId: number, isCircular: boolean): Promise<BadgeIcon> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/badges/icons?badgeIds=${badgeId}&size=150x150&format=Png&isCircular=${isCircular}`,
                requiresAuth: false
            })
                .then(response => {
                    resolve(response.data.data[0]);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getBundle (bundleId: number, size: "150x150" | "420x420", isCircular: boolean): Promise<BadgeIcon> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/bundles/thumbnails?bundleIds=${bundleId}&size=${size}&format=Png&isCircular=${isCircular}`,
                requiresAuth: false
            })
                .then(response => {
                    resolve(response.data.data[0]);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

const Thumbnails = new BaseThumbnails();

export default Thumbnails;

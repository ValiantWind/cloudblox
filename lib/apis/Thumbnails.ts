import axios from "axios";

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

export type ThumbnailMetaData = {
    isWebappUseCacheEnabled: boolean;
    webappCacheExpirationTimspan: string;
};

type BaseThumbnails = {
    get3dAsset(AssetId: number): Promise<AssetThumbnail3D>;
    getAnimatedAsset(AssetId: number): Promise<AnimatedAssetThumbnail>;
    get3dAvatar(UserId: number): Promise<AvatarThumbnail3D>;
    getMetaData(): Promise<ThumbnailMetaData>;
};

const Thumbnails: BaseThumbnails = {
    get3dAsset,
    getAnimatedAsset,
    get3dAvatar,
    getMetaData
};

function get3dAsset (AssetId: number): Promise<AssetThumbnail3D> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://thumbnails.roblox.com/v1/asset-thumbnail-animated?assetId=${AssetId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAnimatedAsset (AssetId: number): Promise<AnimatedAssetThumbnail> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://thumbnails.roblox.com/v1/assets-thumbnail-3d?assetId=${AssetId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function get3dAvatar (UserId: number): Promise<AvatarThumbnail3D> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://thumbnails.roblox.com/v1/users/avatar-3d?userId=${UserId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getMetaData (): Promise<ThumbnailMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://thumbnails.roblox.com/v1/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default Thumbnails;

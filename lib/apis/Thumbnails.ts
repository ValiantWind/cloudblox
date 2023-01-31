import axios from 'axios';

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
  Get3dAsset(AssetId: number): Promise<AssetThumbnail3D>;
  Get3dAvatar(UserId: number): Promise<AvatarThumbnail3D>;
  GetMetaData(): Promise<ThumbnailMetaData>;
};

const Thumbnails: BaseThumbnails = {
  Get3dAsset,
  Get3dAvatar,
  GetMetaData,
};

function Get3dAsset(AssetId: number): Promise<AssetThumbnail3D> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://thumbnails.roblox.com/v1/asset-thumbnail-animated?assetId=${AssetId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetAnimatedAsset(AssetId: number): Promise<AnimatedAssetThumbnail> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://thumbnails.roblox.com/v1/assets-thumbnail-3d?assetId=${AssetId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function Get3dAvatar(UserId: number): Promise<AvatarThumbnail3D> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://thumbnails.roblox.com/v1/users/avatar-3d`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetMetaData(): Promise<ThumbnailMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://thumbnails.roblox.com/v1/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Thumbnails;

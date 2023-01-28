import axios from 'axios';

export type ThumbnailMetaData = {
  isWebappUseCacheEnabled: boolean;
  webappCacheExpirationTimspan: string;
};

export type AvatarThumbnail3D = {
  targetId: number;
  state: string;
  imageUrl: string;
};

type BaseThumbnails = {
  GetMetaData(): Promise<ThumbnailMetaData>;
};

const Thumbnails: BaseThumbnails = {
  GetMetaData,
};

function Get3DAvatar(UserId: number): Promise<AvatarThumbnail3D> {
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

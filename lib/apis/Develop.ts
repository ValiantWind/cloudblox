import axios from 'axios';

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

export type CanManage = {
  Success: boolean;
  CanManage: boolean;
};

export type UniverseIdFromPlaceId = {
  universeId: number;
};

type BaseDevelop = {
  GetUniverseInfo(UniverseId: number): Promise<UniverseInfo>;
  CanManageAsset(UserId: number, AssetId: number): Promise<CanManage>;
  GetUniverseIdFromPlaceId(PlaceId: number): Promise<UniverseIdFromPlaceId>;
};

const Develop: BaseDevelop = {
  GetUniverseInfo,
  CanManageAsset,
  GetUniverseIdFromPlaceId,
};

function GetUniverseInfo(UniverseId: number): Promise<UniverseInfo> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://develop.roblox.com/v1/universes/${UniverseId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function CanManageAsset(UserId: number, AssetId: number): Promise<CanManage> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://develop.roblox.com/v1/user/${UserId}/canmanage/${AssetId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetUniverseIdFromPlaceId(PlaceId: number): Promise<UniverseIdFromPlaceId> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://apis.roblox.com/universes/v1/places/${PlaceId}/universe`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Develop;

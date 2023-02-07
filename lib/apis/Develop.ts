import axios from 'axios';

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

export type CanManage = {
  Success: boolean;
  CanManage: boolean;
};

export type UniverseIdFromPlaceId = number;

type BaseDevelop = {
  GetPlaceConfig(PlaceId: number): Promise<PlaceConfiguration>;
  UpdatePlaceConfig(PlaceId: number, PlaceConfig: PlaceConfiguration): Promise<void>;
  GetGameTemplates(): Promise<GameTemplates>;
  GetUniverseInfo(UniverseId: number): Promise<UniverseInfo>;
  CanManageAsset(UserId: number, AssetId: number): Promise<CanManage>;
  GetUniverseIdFromPlaceId(PlaceId: number): Promise<UniverseIdFromPlaceId>;
};

const Develop: BaseDevelop = {
  GetPlaceConfig,
  UpdatePlaceConfig,
  GetGameTemplates,
  GetUniverseInfo,
  CanManageAsset,
  GetUniverseIdFromPlaceId,
};

function GetPlaceConfig(PlaceId: number): Promise<PlaceConfiguration> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://develop.roblox.com/v2/places/${PlaceId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function UpdatePlaceConfig(PlaceId: number, PlaceConfig: PlaceConfiguration): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://develop.roblox.com/v2/places/${PlaceId}`, {
      configuration: PlaceConfig,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

function GetGameTemplates(): Promise<GameTemplates> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://develop.roblox.com/v1/gametemplates`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

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
        resolve(response.data.universeId);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default Develop;

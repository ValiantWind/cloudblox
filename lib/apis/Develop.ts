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

export type GameUpdateNotifications = {
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

type BaseDevelop = {
  GetPlaceConfig(PlaceId: number): Promise<PlaceConfiguration>;
  UpdatePlaceConfig(PlaceId: number, PlaceConfig: PlaceConfiguration): Promise<void>;
  GetGameTemplates(): Promise<GameTemplates>;
  GetUniverseInfo(UniverseId: number): Promise<UniverseInfo>;
  CanManageAsset(UserId: number, AssetId: number): Promise<CanManage>;
  GetUniverseIdFromPlaceId(PlaceId: number): Promise<UniverseIdFromPlaceId>;
  GetAssetVotingInfo(AssetIds: number[]): Promise<AssetVotingInfo[]>;
  GetGameUpdates(UniverseId: number): Promise<GameUpdateNotifications[]>;
};

const Develop: BaseDevelop = {
  GetPlaceConfig,
  UpdatePlaceConfig,
  GetGameTemplates,
  GetUniverseInfo,
  CanManageAsset,
  GetUniverseIdFromPlaceId,
  GetAssetVotingInfo,
  GetGameUpdates,
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

function GetAssetVotingInfo(AssetIds: number[]): Promise<AssetVotingInfo[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://develop.roblox.com/v1/assets/voting?assetIds=${AssetIds.join(',')}`)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetGameUpdates(UniverseId: number): Promise<GameUpdateNotifications[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://develop.roblox.com/v1/gameUpdateNotifications/${UniverseId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default Develop;

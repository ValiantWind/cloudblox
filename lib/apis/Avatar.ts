import axios from 'axios';

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

export type BodyColors = {
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
  playerAvatarTypes: ('R6' | 'R15' | string)[];
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

export type UserAvatarDetails = {
  scales: BodyScales;
  playerAvatarType: 'R6' | 'R15' | string;
  bodyColors: BodyColors;
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

export type GetOutfit = {
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
  bodyColors: BodyColors;
  scale: BodyScales;
  playerAvatarType: string;
  isEditable: boolean;
};

type BaseAvatar = {
  GetUserAvatar(UserId: number): Promise<UserAvatarDetails>;
  GetClientAvatar(): Promise<ClientAvatarDetails>;
  GetUserOutfits(UserId: number): Promise<UserOutfits>;
  GetAvatarRules(): Promise<AvatarRules>;
  GetMetaData(): Promise<AvatarMetaData>;
};

const Avatar: BaseAvatar = {
  GetUserAvatar,
  GetClientAvatar,
  GetUserOutfits,
  GetAvatarRules,
  GetMetaData,
};

function GetUserAvatar(UserId: number): Promise<UserAvatarDetails> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://avatar.roblox.com/v1/users/${UserId}/avatar`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetClientAvatar(): Promise<ClientAvatarDetails> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://avatar.roblox.com/v1/avatar`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetUserOutfits(UserId: number): Promise<UserOutfits> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://avatar.roblox.com/v1/users/${UserId}/outfits`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetAvatarRules(): Promise<AvatarRules> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://avatar.roblox.com/v1/avatar-rules`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetMetaData(): Promise<AvatarMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://avatar.roblox.com/v1/avatar/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Avatar;

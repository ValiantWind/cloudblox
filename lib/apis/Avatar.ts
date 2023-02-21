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

export type UserCurrentlyWearing = {
  assetIds: number[];
};

export type UserAvatarDetails = {
  scales: BodyScales;
  playerAvatarType: 'R6' | 'R15' | string;
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

type BaseAvatar = {
  GetUserAvatar(UserId: number): Promise<UserAvatarDetails>;
  GetUserCurrentlyWearing(UserId: number): Promise<UserCurrentlyWearing>;
  RemoveClientAsset(AssetId: number): Promise<boolean>;
  GetClientAvatar(): Promise<ClientAvatarDetails>;
  GetUserOutfits(UserId: number): Promise<UserOutfits>;
  SetClientBodyScales(
    height: number,
    width: number,
    head: number,
    depth: number,
    proportion: number,
    bodyType: number,
  ): Promise<boolean>;
  SetClientAvatarType(AvatarType: 'R6' | 'R15'): Promise<boolean>;
  GetAvatarRules(): Promise<AvatarRules>;
  GetMetaData(): Promise<AvatarMetaData>;
  GetGameStartInfo(UniverseId: number): Promise<AvatarGameStartInfo>;
  RedrawClientThumbnail(): Promise<void>;
  SetClientBodyColors(BodyColors: AvatarBodyColors): Promise<boolean>;
  GetOutfitDetails(OutfitId: number): Promise<OutfitDetails>;
  DeleteClientOutfit(OutfitId: number): Promise<boolean>;
};

const Avatar: BaseAvatar = {
  GetUserAvatar,
  GetUserCurrentlyWearing,
  RemoveClientAsset,
  GetClientAvatar,
  GetUserOutfits,
  SetClientBodyScales,
  SetClientAvatarType,
  GetAvatarRules,
  GetMetaData,
  GetGameStartInfo,
  RedrawClientThumbnail,
  SetClientBodyColors,
  GetOutfitDetails,
  DeleteClientOutfit,
};

function GetUserAvatar(UserId: number): Promise<UserAvatarDetails> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://avatar.roblox.com/v1/users/${UserId}/avatar`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetUserCurrentlyWearing(UserId: number): Promise<UserCurrentlyWearing> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://avatar.roblox.com/v1/users/${UserId}/currently-wearing`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
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
        reject(new Error(error));
      });
  });
}

function RemoveClientAsset(assetId: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .post(`https://avatar.roblox.com/v1/avatar/assets/${assetId}/remove`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        resolve(response.data.success);
      })
      .catch((error) => {
        reject(new Error(error));
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
        reject(new Error(error));
      });
  });
}

function SetClientBodyScales(
  height: number,
  width: number,
  head: number,
  depth: number,
  proportion: number,
  bodyType: number,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .post(`https://avatar.roblox.com/v1/avatar/set-scales`, {
        height,
        width,
        head,
        depth,
        proportion,
        bodyType,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function SetClientAvatarType(AvatarType: 'R6' | 'R15'): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let avatarType: number;
    if (AvatarType === 'R6') {
      avatarType = 1;
    } else if (AvatarType === 'R15') {
      avatarType = 3;
    }
    axios
      .post(`https://avatar.roblox.com/v1/avatar/set-player-avatar-type`, {
        playerAvatarType: avatarType,
      })
      .then((response) => {
        resolve(response.data.success);
      })
      .catch((error) => {
        reject(new Error(error));
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
        reject(new Error(error));
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
        reject(new Error(error));
      });
  });
}

function GetGameStartInfo(UniverseId: number): Promise<AvatarGameStartInfo> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://avatar.roblox.com/v1/game-start-info?universeId=${UniverseId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function RedrawClientThumbnail(): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios.post(`https://avatar.roblox.com/v1/avatar/redraw-thumbnail`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

async function SetClientBodyColors(BodyColors: AvatarBodyColors): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .post(`https://avatar.roblox.com/v1/avatar/set-body-colors`, {
        BodyColors,
      })
      .then((response) => {
        resolve(response.data.success);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetOutfitDetails(OutfitId: number): Promise<OutfitDetails> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://avatar.roblox.com/v1/outfits/${OutfitId}/details`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function DeleteClientOutfit(OutfitId: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://avatar.roblox.com/v1/outfits/${OutfitId}/delete`)
      .then((response) => {
        resolve(response.data.success);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function WearClientOutfit(OutfitId: number): Promise<OutfitInvalidAssets> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .post(`https://avatar.roblox.com/v1/outfits/${OutfitId}/wear`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function CreateClientOutfit(OutfitOptions: NewOutfitOptions): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://avatar.roblox.com/v2/outfits/create`, {
      outfitUpdateModel: OutfitOptions,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

async function UpdateClientOutfit(OutfitId: number, OutfitOptions: NewOutfitOptions): Promise<UpdatedOutfitResults> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .patch(`https://avatar.roblox.com/v2/outfits/${OutfitId}`, {
        outfitUpdateModel: OutfitOptions,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default Avatar;

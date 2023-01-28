import axios from 'axios';

export type ClientUserInfo = {
  id: number;
  name: string;
  displayName: string;
};

export type ClientAgeBracket = {
  ageBracket: number;
};

export type ClientCountryCode = {
  countryCode: string;
};

export type ClientPublicRoles = {
  roles: string[];
};

export type ClientAvatarDetails = {
  scales: {
    height: number;
    width: number;
    head: number;
    depth: number;
    proportion: number;
    bodyType: number;
  };
  playerAvatarType: 'R6' | 'R15' | string;
  bodyColors: {
    headColorId: number;
    torsoColorId: number;
    rightArmColorId: number;
    leftArmColorId: number;
    rightLegColorId: number;
    leftLegColorId: number;
  };
  assets: {
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
  defaultShirtApplied: boolean;
  defaultPantsApplied: boolean;
  emotes: {
    assetId: number;
    assetName: string;
    position: number;
  }[];
};

export default class Client {
  UniverseId: number = globalThis.UniverseId;
  MessagingService: string = globalThis.MessagingService;
  AssetsAPI: string = globalThis.AssetsAPI;
  PlacePublishing: string = globalThis.PlacePublishing;

  Configure({
    UniverseId,
    MessagingService,
    AssetsAPI,
    PlacePublishing,
    Cookie,
  }: {
    UniverseId?: number;
    MessagingService?: string;
    AssetsAPI?: string;
    PlacePublishing?: string;
    Cookie?: string;
  } = {}) {
    this.UniverseId = UniverseId;
    this.MessagingService = MessagingService;
    this.AssetsAPI = AssetsAPI;
    this.PlacePublishing = PlacePublishing;
    axios.defaults.headers.common[`Cookie`] = `.ROBLOSECURITY=${Cookie}`;
  }

  GetAgeBracket(): Promise<ClientAgeBracket> {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://users.roblox.com/v1/users/authenticated/age-bracket`, {
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

  GetCountryCode(): Promise<ClientCountryCode> {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://users.roblox.com/v1/users/authenticated/country-code`, {
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

  GetAvatarDetails(): Promise<ClientAvatarDetails> {
    return new Promise((resolve, reject) => {
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

  GetUserInfo(): Promise<ClientUserInfo> {
    return new Promise((resolve, reject) => {
      axios
        .post(`https://users.roblox.com/v1/users/authenticated`, {
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
}

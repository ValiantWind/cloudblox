import axios from 'axios';

export type GameMediaData = {
  data: {
    assetTypeId: number;
    assetType: string;
    imageId: number;
    videoHash: string;
    videoTitle: string;
    approved: boolean;
    altText: string;
  }[];
};

export type GamesFromGroup = {
  previousPageCursor: string;
  nextPageCursor: string;
  data: {
    id: number;
    name: string;
    description: string;
    creator: {
      id: number;
      type: number;
      name: string;
    };
    rootPlace: {
      id: number;
      type: number;
      name: string;
    };
    created: Date;
    updated: Date;
    placeVisits: string;
  }[];
};

export type MultiGameDetails = {
  data: {
    id: number;
    rootPlaceId: number;
    name: string;
    description: string;
    sourceName: string;
    sourceDescription: string;
    creator: {
      id: number;
      name: string;
      type: string;
      isRNVAccount: boolean;
      hasVerifiedBadge: boolean;
    };
    price: number;
    allowedGameGenres: string[];
    allowedGearCategories: string[];
    isGenreEnforced: boolean;
    copyingAllowed: boolean;
    playing: number;
    visits: number;
    maxPlayers: number;
    created: Date;
    updated: Date;
    studioAccessToApisAllowed: boolean;
    createVipServerAllowed: boolean;
    universeAvatarType: string;
    genre: string;
    isAllGenre: boolean;
    isFavoritedByUser: boolean;
    favoritedCount: number;
  }[];
};

export type MultiGameProductInfo = {
  data: {
    universeId: number;
    isForSale: boolean;
    productId: number;
    price: number;
    sellerId: number;
  }[];
};

export type MultiPlaceDetails = {
  placeId: number;
  name: string;
  description: string;
  sourceName: string;
  sourceDescription: string;
  url: string;
  builder: string;
  builderId: number;
  hasVerifiedBadge: boolean;
  isPlayable: boolean;
  reasonProhibited: string;
  universeId: number;
  universeRootPlaceId: number;
  price: number;
  imageToken: string;
}[];

export type GameFavoriteCount = {
  favoritesCount: number;
};

export type PrivateServersEnabled = {
  privateServersEnabled: boolean;
};

type BaseGames = {
  GetMediaData(UniverseId: number): Promise<GameMediaData>;
  MultiGetGameDetails(UniverseIds: number[]): Promise<MultiGameDetails>;
  MultiGetGameProductInfo(UniverseIds: number[]): Promise<MultiGameProductInfo>;
  MultiGetPlaceDetails(PlaceIds: number[]): Promise<MultiPlaceDetails>;
  GetFavoriteCount(UniverseId: number): Promise<GameFavoriteCount>;
  ArePrivateServersEnabledForGame(UniverseId: number): Promise<PrivateServersEnabled>;
};

const Games: BaseGames = {
  GetMediaData,
  MultiGetGameDetails,
  MultiGetGameProductInfo,
  MultiGetPlaceDetails,
  GetFavoriteCount,
  ArePrivateServersEnabledForGame,
};

function GetMediaData(UniverseId: number): Promise<GameMediaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://games.roblox.com/v2/games/${UniverseId}/media`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function MultiGetGameDetails(UniverseIds: number[]): Promise<MultiGameDetails> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://games.roblox.com/v1/games?universeIds=${UniverseIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function MultiGetGameProductInfo(UniverseIds: number[]): Promise<MultiGameProductInfo> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://games.roblox.com/v1/games/games-product-info?universeIds=${UniverseIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function MultiGetPlaceDetails(PlaceIds: number[]): Promise<MultiPlaceDetails> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${PlaceIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetFavoriteCount(UniverseId: number): Promise<GameFavoriteCount> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://games.roblox.com/v1/games/${UniverseId}/favorites/count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function ArePrivateServersEnabledForGame(UniverseId: number): Promise<PrivateServersEnabled> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://games.roblox.com/v1/private-servers/enabled-in-universe/${UniverseId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Games;

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

export type GameSpotlightList = {
  data: {
    spotlightType: string;
    spotlightActionText: string;
    spotlightTypeData: {};
    gameInfo: {
      creatorId: number;
      creatorName: string;
      creatorType: string;
      creatorHasVerifiedBadge: boolean;
      totalUpVotes: number;
      totalDownVotes: number;
      universeId: number;
      name: string;
      placeId: number;
      playerCount: number;
      imageToken: string;
      isSponsored: boolean;
      nativeAdData: string;
      isShowSponsoredLabel: boolean;
      price: number;
      analyticsIdentifier: string;
      gameDescription: string;
      genre: string;
    };
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

export type GamePlayabilityStatus = {
  playabilityStatus: number;
  isPlayable: boolean;
  universeId: number;
};

export type GameFavoriteCount = {
  favoritesCount: number;
};

export type PrivateServersEnabled = {
  privateServersEnabled: boolean;
};

export type FavoritedByClient = {
  isFavorited: boolean;
};

export type ClientVoteStatus = {
  canVote: boolean;
  userVote: boolean | null;
  reasonForNotVotable: string;
};

export type MultiGameVotes = {
  data: {
    id: number;
    upVotes: number;
    downVotes: number;
  }[];
};

type BaseGames = {
  GetMediaData(UniverseId: number): Promise<GameMediaData>;
  MultiGetGameDetails(UniverseIds: number[]): Promise<MultiGameDetails>;
  MultiGetGameProductInfo(UniverseIds: number[]): Promise<MultiGameProductInfo>;
  GetGameSpotlightList(): Promise<GameSpotlightList>;
  MultiGetPlaceDetails(PlaceIds: number[]): Promise<MultiPlaceDetails>;
  MultiGetGamePlayabilityStatus(UniverseIds: number[]): Promise<GamePlayabilityStatus>;
  GetFavoriteCount(UniverseId: number): Promise<GameFavoriteCount>;
  ArePrivateServersEnabledForGame(UniverseId: number): Promise<PrivateServersEnabled>;
  IsFavoritedByClient(UniverseId: number): Promise<FavoritedByClient>;
  GetClientVoteStatus(UniverseId: number): Promise<ClientVoteStatus>;
  MultiGetGameVotes(UniverseIds: number[]): Promise<MultiGameVotes>;
  VoteGame(UniverseId: number, vote: boolean): Promise<void>;
};

const Games: BaseGames = {
  GetMediaData,
  MultiGetGameDetails,
  MultiGetGameProductInfo,
  GetGameSpotlightList,
  MultiGetPlaceDetails,
  MultiGetGamePlayabilityStatus,
  GetFavoriteCount,
  ArePrivateServersEnabledForGame,
  IsFavoritedByClient,
  GetClientVoteStatus,
  MultiGetGameVotes,
  VoteGame,
};

function GetMediaData(UniverseId: number): Promise<GameMediaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://games.roblox.com/v2/games/${UniverseId}/media`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
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
        reject(new Error(error));
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

function GetGameSpotlightList(): Promise<GameSpotlightList> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://games.roblox.com/v1/games/list-spotlight`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
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
        reject(new Error(error));
      });
  });
}

function MultiGetGamePlayabilityStatus(UniverseIds: number[]): Promise<GamePlayabilityStatus> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://games.roblox.com/v1/games/multiget-playability-status?universeIds=${UniverseIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
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
        reject(new Error(error));
      });
  });
}

function ArePrivateServersEnabledForGame(UniverseId: number): Promise<PrivateServersEnabled> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://games.roblox.com/v1/private-servers/enabled-in-universe/${UniverseId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function IsFavoritedByClient(UniverseId: number): Promise<FavoritedByClient> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://games.roblox.com/v1/games/${UniverseId}/favorites`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetClientVoteStatus(UniverseId: number): Promise<ClientVoteStatus> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://games.roblox.com/v1/games/${UniverseId}/votes/user`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function MultiGetGameVotes(UniverseIds: number[]): Promise<MultiGameVotes> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://games.roblox.com/v1/games/votes?universeIds=${UniverseIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function VoteGame(UniverseId: number, vote: boolean): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://games.roblox.com/v1/games/${UniverseId}/user-votes`, {
      headers: {
        Accept: 'application/json',
        ContentType: 'application/json',
      },
      data: {
        vote,
      },
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

export default Games;

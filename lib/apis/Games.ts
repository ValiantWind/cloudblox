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

export type GameSortList = {
  sorts: {
    token: string;
    name: string;
    displayName: string;
    gameSetTypeId: number;
    gameSetTargetId: number;
    timeOptionsAvailable: boolean;
    genreOptionsAvailable: boolean;
    numberOfRows: number;
    numberOfGames: number;
    isDefaultSort: boolean;
    contextUniverseId: number;
    contextCountryRegionId: number;
    tokenExpiryInSeconds: number;
  }[];
  timeFilters: {
    token: string;
    name: string;
    tokenExpiryInSeconds: number;
  }[];
  gameFilters: {
    token: string;
    name: string;
    tokenExpiryInSeconds: number;
  }[];
  genreFilters: {
    token: string;
    name: string;
    tokenExpiryInSeconds: number;
  }[];
  pageContext: {
    pageId: string;
    isSeeAllPage: boolean;
  }[];
  gameSortStyle: string;
};

export type GameFavoriteCount = number;

export type GameGamePasses = {
  previousPageCursor: string;
  nextPageCursor: string;
  data: {
    id: number;
    name: string;
    displayName: string;
    productId: number;
    price: number;
    sellerName: string;
    sellerId: number;
    isOwned: boolean;
  }[];
};

export type PrivateServersEnabled = boolean;

export type FavoritedByClient = boolean;

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

export type MultiPrivateServers = {
  privateServerResponses: {
    id: string;
    maxPlayers: number;
    playing: number;
    playerTokens: string[];
    players: {
      playerToken: string;
      id: number;
      name: string;
      displayName: string;
    }[];
    fps: number;
    ping: number;
    name: string;
    vipServerId: number;
    accessCode: string;
    owner: {
      hasVerifiedBadge: boolean;
      id: number;
      name: string;
      displayName: string;
    };
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
  MultiGetPrivateServers(PrivateServerIds: number[]): Promise<MultiPrivateServers>;
  GetGamePasses(
    UniverseId: number,
    sortOrder?: 'Asc' | 'Desc',
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
  ): Promise<GameGamePasses>;
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
  MultiGetPrivateServers,
  GetGamePasses,
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

function GetGameSorts(SortsContext: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): Promise<GameSortList> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://games.roblox.com/v1/games/sorts?GameSortsContext=${SortsContext}`)
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
        resolve(response.data.favoritesCount);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetGamePasses(
  UniverseId: number,
  sortOrder?: 'Asc' | 'Desc',
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
): Promise<GameGamePasses> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://games.roblox.com/v1/games/${UniverseId}/game-passes`)

        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://games.roblox.com/v1/games/${UniverseId}/game-passes?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://games.roblox.com/v1/games/${UniverseId}/game-passes?limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://games.roblox.com/v1/games/${UniverseId}/game-passes?sortOrder=${sortOrder}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder) {
      axios
        .get(`https://games.roblox.com/v1/games/${UniverseId}/game-passes?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit) {
      axios
        .get(`https://games.roblox.com/v1/games/${UniverseId}/game-passes?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!cursor) {
      axios
        .get(`https://games.roblox.com/v1/games/${UniverseId}/game-passes?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else {
      axios
        .get(
          `https://games.roblox.com/v1/games/${UniverseId}/game-passes?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`,
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    }
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
        resolve(response.data.privateServersEnabled);
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
        resolve(response.data.isFavorited);
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

function MultiGetPrivateServers(PrivateServerIds: number[]): Promise<MultiPrivateServers> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://games.roblox.com/v1/private-servers?privateServerIds=${PrivateServerIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default Games;

import axios, { AxiosRequestConfig } from "axios";

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
        spotlightTypeData: object;
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

export type EngagementPayoutHistory = {
    additionalProp1: {
        engagementScore: number;
        payoutInRobux: number;
        payoutType: string;
        eligibilityType: string;
    };
    additionalProp2: {
        engagementScore: number;
        payoutInRobux: number;
        payoutType: string;
        eligibilityType: string;
    };
    additionalProp3: {
        engagementScore: number;
        payoutInRobux: number;
        payoutType: string;
        eligibilityType: string;
    };
};

type BaseGames = {
    getEngagementPayoutHistory(universeId: number, startDate: string, endDate: string): Promise<EngagementPayoutHistory>;
    getMediaData(universeId: number): Promise<GameMediaData>;
    multiGetGameDetails(universeIds: number[]): Promise<MultiGameDetails>;
    multiGetGameProductInfo(universeIds: number[]): Promise<MultiGameProductInfo>;
    getGameSpotlightList(): Promise<GameSpotlightList>;
    multiGetPlaceDetails(placeIds: number[]): Promise<MultiPlaceDetails>;
    multiGetGamePlayabilityStatus(universeIds: number[]): Promise<GamePlayabilityStatus>;
    getGameSorts(sortsContext: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): Promise<GameSortList>;
    getFavoriteCount(universeId: number): Promise<GameFavoriteCount>;
    arePrivateServersEnabledForGame(universeId: number): Promise<PrivateServersEnabled>;
    isFavoritedByClient(universeId: number): Promise<FavoritedByClient>;
    getClientVoteStatus(universeId: number): Promise<ClientVoteStatus>;
    multiGetGameVotes(universeIds: number[]): Promise<MultiGameVotes>;
    voteGame(universeId: number, vote: boolean): Promise<void>;
    multiGetPrivateServers(privateServerIds: number[]): Promise<MultiPrivateServers>;
    getGamePasses(
        universeId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<GameGamePasses>;
    favoriteGame(universeId: number): Promise<void>;
    unfavoriteGame(universeId: number): Promise<void>;
};

const Games: BaseGames = {
    getEngagementPayoutHistory,
    getMediaData,
    multiGetGameDetails,
    multiGetGameProductInfo,
    getGameSpotlightList,
    multiGetPlaceDetails,
    multiGetGamePlayabilityStatus,
    getGameSorts,
    getFavoriteCount,
    arePrivateServersEnabledForGame,
    isFavoritedByClient,
    getClientVoteStatus,
    multiGetGameVotes,
    voteGame,
    multiGetPrivateServers,
    getGamePasses,
    favoriteGame,
    unfavoriteGame
};

function getEngagementPayoutHistory (
    universeId: number,
    startDate: string,
    endDate: string,
): Promise<EngagementPayoutHistory> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }

        const config = {
            method: "get",
            url: "https://engagementpayouts.roblox.com/v1/universe-payout-history",
            params: {
                universeId,
                startDate,
                endDate
            }
        };
        axios(config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
function getMediaData (universeId: number): Promise<GameMediaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`http://games.roblox.com/v2/games/${universeId}/media`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function multiGetGameDetails (universeIds: number[]): Promise<MultiGameDetails> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://games.roblox.com/v1/games?universeIds=${universeIds.join(",")}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function multiGetGameProductInfo (universeIds: number[]): Promise<MultiGameProductInfo> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://games.roblox.com/v1/games/games-product-info?universeIds=${universeIds.join(",")}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getGameSpotlightList (): Promise<GameSpotlightList> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://games.roblox.com/v1/games/list-spotlight`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function multiGetPlaceDetails (placeIds: number[]): Promise<MultiPlaceDetails> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeIds.join(",")}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function multiGetGamePlayabilityStatus (universeIds: number[]): Promise<GamePlayabilityStatus> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://games.roblox.com/v1/games/multiget-playability-status?universeIds=${universeIds.join(",")}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getGameSorts (sortsContext: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): Promise<GameSortList> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://games.roblox.com/v1/games/sorts?GameSortsContext=${sortsContext}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getFavoriteCount (universeId: number): Promise<GameFavoriteCount> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://games.roblox.com/v1/games/${universeId}/favorites/count`)
            .then(response => {
                resolve(response.data.favoritesCount);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getGamePasses (
    universeId: number,
    sortOrder?: "Asc" | "Desc",
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
): Promise<GameGamePasses> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config: AxiosRequestConfig = {
            method: "get",
            url: `https://games.roblox.com/v1/games/${universeId}/game-passes`,
            params: {
                sortOrder,
                limit,
                cursor
            }
        };

        axios(config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function arePrivateServersEnabledForGame (universeId: number): Promise<PrivateServersEnabled> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://games.roblox.com/v1/private-servers/enabled-in-universe/${universeId}`)
            .then(response => {
                resolve(response.data.privateServersEnabled);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function isFavoritedByClient (universeId: number): Promise<FavoritedByClient> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://games.roblox.com/v1/games/${universeId}/favorites`)
            .then(response => {
                resolve(response.data.isFavorited);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientVoteStatus (universeId: number): Promise<ClientVoteStatus> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://games.roblox.com/v1/games/${universeId}/votes/user`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function multiGetGameVotes (universeIds: number[]): Promise<MultiGameVotes> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://games.roblox.com/v1/games/votes?universeIds=${universeIds.join(",")}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function voteGame (universeId: number, vote: boolean): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://games.roblox.com/v1/games/${universeId}/user-votes`, {
            headers: {
                Accept: "application/json",
                ContentType: "application/json"
            },
            data: {
                vote
            }
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function multiGetPrivateServers (privateServerIds: number[]): Promise<MultiPrivateServers> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://games.roblox.com/v1/private-servers?privateServerIds=${privateServerIds.join(",")}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function favoriteGame (universeId: number): Promise<void> {
    const config: AxiosRequestConfig = {
        method: "post",
        url: `https://games.roblox.com/v1/games/${universeId}/favorites`,
        data: {
            isFavorited: true
        }
    };

    await axios(config).catch(error => {
        Promise.reject(error);
    });
}

async function unfavoriteGame (universeId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }

    const config: AxiosRequestConfig = {
        method: "post",
        url: `https://games.roblox.com/v1/games/${universeId}/favorites`,
        data: {
            isFavorited: false
        }
    };

    await axios(config).catch(error => {
        Promise.reject(error);
    });
}
export default Games;

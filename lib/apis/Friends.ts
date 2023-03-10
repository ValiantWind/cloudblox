import axios from "axios";

export type FriendMetaData = {
    isFriendsFilterBarEnabled: boolean;
    isFriendsPageSortExperimentEnabled: boolean;
    isFriendsUserDataStoreCacheEnabled: boolean;
    frequentFriendSortRollout: number;
    userName: string;
    displayName: string;
};

export type ClientFriendRequestCount = number;

export type UserFriends = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        isOnline: boolean;
        presenceType: number;
        isDeleted: boolean;
        friendFrequentScore: number;
        friendFrequentRank: number;
        hasVerifiedBadge: boolean;
        description: string;
        created: Date;
        isBanned: boolean;
        externalAppDisplayName: string;
        id: number;
        name: string;
        displayName: string;
    }[];
};

export type UserFriendCount = number;

export type UserFollowings = UserFriends;

export type UserFollowingCount = UserFriendCount;

export type UserFollowers = UserFriends;

export type UserFollowerCount = UserFriendCount;

export type UserOnlineFriends = {
    data: {
        userPresence: {
            UserPresenceType: string;
            UserLocationType: string;
            lastLocation: string;
            placeId: number;
            rootPlaceId: number;
            gameInstanceId: string;
            universeId: number;
            lastOnline: Date;
        };
        id: number;
        name: string;
        displayName: string;
    }[];
};

export type FriendStatuses = {
    data: {
        id: number;
        status: number;
    };
};

export type RequestToContactResult = {
    success: boolean;
    isCaptchaRequired: boolean;
};

export type RecomputeResults = {
    existingCount: number;
    computedCount: number;
    updated: boolean;
};

export type FollowedUserResult = RequestToContactResult;

export type FriendRequestResults = RequestToContactResult;

export type UserFollowingStatusForClient = object;

type BaseFriends = {
    getMetaData(): Promise<FriendMetaData>;
    getClientFriendRequestCount(): Promise<ClientFriendRequestCount>;
    getUserFriends(
        UserId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<UserFriends>;
    getUserFriendCount(UserId: number): Promise<UserFriendCount>;
    getUserFollowings(
        UserId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<UserFollowings>;
    getUserFollowingCount(UserId: number): Promise<UserFollowingCount>;
    getUserFollowers(
        UserId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<UserFollowers>;
    getUserFollowerCount(UserId: number): Promise<UserFollowerCount>;
    getUserOnlineFriends(UserId: number): Promise<UserOnlineFriends>;
    getFriendStatuses(UserId: number, FriendUserIds: number[]): Promise<FriendStatuses[]>;
    sentFriendRequestToContact(ContactId: number): Promise<RequestToContactResult>;
    declineClientFriendRequests(): Promise<void>;
    acceptClientFriendRequest(RequesterUserId: number): Promise<void>;
    declineClientFriendRequest(RequesterUserId: number): Promise<void>;
    followUser(
        UserId: number,
        CaptchaId?: string,
        CaptchaToken?: string,
        CaptchaProvider?: string,
        ChallengeId?: string,
    ): Promise<FollowedUserResult>;
    recomputeUserFollowings(UserId: number): Promise<RecomputeResults>;
    friendRequestUser(UserId: number, FriendshipOriginSourceType: number): Promise<FriendRequestResults>;
    unfriendUser(UserId: number): Promise<void>;
    unfollowUser(UserId: number): Promise<void>;
    getUserFollowingStatusForClient(UserIds: number[]): Promise<UserFollowingStatusForClient>;
};

const Friends: BaseFriends = {
    getMetaData,
    getClientFriendRequestCount,
    getUserFriends,
    getUserFriendCount,
    getUserFollowings,
    getUserFollowingCount,
    getUserFollowers,
    getUserFollowerCount,
    getUserOnlineFriends,
    getFriendStatuses,
    sentFriendRequestToContact,
    declineClientFriendRequests,
    acceptClientFriendRequest,
    declineClientFriendRequest,
    followUser,
    recomputeUserFollowings,
    friendRequestUser,
    unfollowUser,
    unfriendUser,
    getUserFollowingStatusForClient
};

function getMetaData (): Promise<FriendMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://friends.roblox.com/v1/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientFriendRequestCount (): Promise<ClientFriendRequestCount> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://friends.roblox.com/v1/user/friend-requests/count`)
            .then(response => {
                resolve(response.data.count);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserFriends (
    UserId: number,
    sortOrder?: "Asc" | "Desc",
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
): Promise<UserFriends> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://friends.roblox.com/v1/users/${UserId}/friends`,
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

function getUserFriendCount (UserId: number): Promise<UserFriendCount> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://friends.roblox.com/v1/users/${UserId}/friends/count`)
            .then(response => {
                resolve(response.data.count);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserFollowings (
    UserId: number,
    sortOrder?: "Asc" | "Desc",
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
): Promise<UserFollowings> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://friends.roblox.com/v1/users/${UserId}/followings`,
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

function getUserFollowingCount (UserId: number): Promise<UserFollowingCount> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://friends.roblox.com/v1/users/${UserId}/followings/count`)
            .then(response => {
                resolve(response.data.count);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserFollowers (
    UserId: number,
    sortOrder?: "Asc" | "Desc",
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
): Promise<UserFollowers> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://friends.roblox.com/v1/users/${UserId}/followers`,
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

function getUserFollowerCount (UserId: number): Promise<UserFollowerCount> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://friends.roblox.com/v1/users/${UserId}/followers/count`)
            .then(response => {
                resolve(response.data.count);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserOnlineFriends (UserId: number): Promise<UserOnlineFriends> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://friends.roblox.com/v1/users/${UserId}/friends/online`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getFriendStatuses (UserId: number, FriendUserIds: number[]): Promise<FriendStatuses[]> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://friends.roblox.com/v1/users/${UserId}/friends/sstatuses?userIds=${FriendUserIds.join(",")}`)
            .then(response => {
                resolve(response.data.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function sentFriendRequestToContact (ContactId: number): Promise<RequestToContactResult> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://friends.roblox.com/v1/contacts/${ContactId}/request-friendship`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function declineClientFriendRequests (): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }

    await axios.post(`https://friends.roblox.com/v1/user/friend-requests/decline-all`).catch(error => {
        Promise.reject(error);
    });
}

async function acceptClientFriendRequest (RequesterUserId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }

    await axios.post(`https://friends.roblox.com/v1/users/${RequesterUserId}/accept-friend-request`).catch(error => {
        Promise.reject(error);
    });
}

async function declineClientFriendRequest (RequesterUserId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.post(`https://friends.roblox.com/v1/users/${RequesterUserId}/decline-friend-request`).catch(error => {
        Promise.reject(error);
    });
}

function followUser (
    UserId: number,
    CaptchaId?: string,
    CaptchaToken?: string,
    CaptchaProvider?: string,
    ChallengeId?: string,
): Promise<FollowedUserResult> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }

        axios
            .post(`https://friends.roblox.com/v1/users/${UserId}/accept-friend-request`, {
                captchaTokenRequest: {
                    captchaId: CaptchaId,
                    captchaToken: CaptchaToken,
                    captchaProvider: CaptchaProvider,
                    challengeId: ChallengeId
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function recomputeUserFollowings (UserId: number): Promise<RecomputeResults> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .post(`https://friends.roblox.com/v1/users/${UserId}/followings/recount`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function friendRequestUser (UserId: number, FriendshipOriginSourceType: number): Promise<FriendRequestResults> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .post(`https://friends.roblox.com/v1/users/${UserId}/request-friendship`, {
                friendshipOriginSourceType: FriendshipOriginSourceType
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function unfollowUser (UserId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.post(`https://friends.roblox.com/v1/users/${UserId}/unfollow`).catch(error => {
        Promise.reject(error);
    });
}

async function unfriendUser (UserId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.post(`https://friends.roblox.com/v1/users/${UserId}/unfriend`).catch(error => {
        Promise.reject(error);
    });
}

function getUserFollowingStatusForClient (UserIds: number[]): Promise<UserFollowingStatusForClient> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .post(`https://friends.roblox.com/v1/user/following-exists`, {
                targetUserIds: UserIds
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default Friends;

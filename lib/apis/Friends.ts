import axios from 'axios';

export type FriendMetaData = {
  isFriendsFilterBarEnabled: boolean;
  isFriendsPageSortExperimentEnabled: boolean;
  isFriendsUserDataStoreCacheEnabled: boolean;
  frequentFriendSortRollout: number;
  userName: string;
  displayName: string;
};

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

export type UserFriendCount = {
  count: number;
};

export type UserFollowings = UserFriends;

export type UserFollowingCount = UserFriendCount;

export type UserFollowers = UserFriends;

export type UserFollowerCount = UserFriendCount;

type BaseFriends = {
  GetMetaData(): Promise<FriendMetaData>;
  GetUserFriends(UserId: number): Promise<UserFriends>;
  GetUserFriendCount(UserId: number): Promise<UserFriendCount>;
  GetUserFollowings(UserId: number): Promise<UserFollowings>;
  GetUserFollowingCount(UserId: number): Promise<UserFollowingCount>;
  GetUserFollowers(UserId: number): Promise<UserFollowers>;
  GetUserFollowerCount(UserId: number): Promise<UserFollowerCount>;
};

const Friends: BaseFriends = {
  GetMetaData,
  GetUserFriends,
  GetUserFriendCount,
  GetUserFollowings,
  GetUserFollowingCount,
  GetUserFollowers,
  GetUserFollowerCount,
};

function GetMetaData(): Promise<FriendMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://friends.roblox.com/v1/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetUserFriends(
  UserId: number,
  sortOrder?: 'Asc' | 'Desc',
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
): Promise<UserFriends> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/friends`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/friends?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/friends?limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/friends?sortOrder=${sortOrder}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/friends?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/friends?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/friends?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      axios
        .get(
          `https://friends.roblox.com/v1/users/${UserId}/friends?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`,
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

function GetUserFriendCount(UserId: number): Promise<UserFriendCount> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://friends.roblox.com/v1/users/${UserId}/friends/count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetUserFollowings(
  UserId: number,
  sortOrder?: 'Asc' | 'Desc',
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
): Promise<UserFollowings> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followings`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followings?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followings?limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followings?sortOrder=${sortOrder}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followings?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followings?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followings?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      axios
        .get(
          `https://friends.roblox.com/v1/users/${UserId}/followings?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`,
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

function GetUserFollowingCount(UserId: number): Promise<UserFollowingCount> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://friends.roblox.com/v1/users/${UserId}/followings/count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetUserFollowers(
  UserId: number,
  sortOrder?: 'Asc' | 'Desc',
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
): Promise<UserFollowers> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followers`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followers?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followers?limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followers?sortOrder=${sortOrder}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followers?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followers?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!cursor) {
      axios
        .get(`https://friends.roblox.com/v1/users/${UserId}/followers?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      axios
        .get(
          `https://friends.roblox.com/v1/users/${UserId}/followers?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`,
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

function GetUserFollowerCount(UserId: number): Promise<UserFollowerCount> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://friends.roblox.com/v1/users/${UserId}/followers/count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Friends;
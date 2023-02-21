import axios from 'axios';

export type MultiGroupInfo = {
  data: {
    id: number;
    name: string;
    description: string;
    owner: {
      id: number;
      type: string;
    };
    created: Date;
    hasVerifiedBadge: boolean;
  }[];
};

export type GroupInfo = {
  id: number;
  name: string;
  description: string;
  owner: {
    hasVerifiedBadge: boolean;
    userId: number;
    username: string;
    displayName: string;
  };
  shout: {
    body: string;
    poster: {
      hasVerifiedBadge: boolean;
      userId: number;
      username: string;
      displayName: string;
    };
    created: Date;
    updated: Date;
  };
  memberCount: number;
  publicEntryAllowed: boolean;
  isVerified: boolean;
  isLocked: boolean | null;
};

export type UserRoleFromGroups = {
  data: {
    group: {
      id: number;
      name: string;
      memberCount: number;
      hasVerifiedBadge: boolean;
    };
    role: {
      id: number;
      name: string;
      rank: number;
    };
  }[];
};

export type GroupNameChangeHistory = {
  previousPageCursor: string;
  nextPageCursor: string;
  data: {
    name: string;
    created: Date;
  }[];
};

export type GroupSocialLinks = {
  data: {
    id: number;
    type: number;
    url: string;
    title: string;
  }[];
};

export type GroupWallPosts = {
  previousPageCursor: string;
  nextPageCursor: string;
  data: {
    id: number;
    poster: {
      user: {
        hasVerifiedBadge: boolean;
        userId: number;
        username: string;
        displayName: string;
      };
      role: {
        id: number;
        name: string;
        description: string;
        rank: number;
        memberCount: number;
      };
      body: string;
      created: Date;
      updated: Date;
    };
  }[];
};

export type GroupSettings = {
  isApprovalRequired: boolean;
  isBuildersClubRequired: boolean;
  areEnemiesAllowed: boolean;
  areGroupFundsVisible: boolean;
  areGroupGamesVisible: boolean;
  isGroupNameChangeEnabled: boolean;
};

export type GroupConfigMetaData = {
  groupConfiguration: {
    nameMaxLength: number;
    descriptionMaxLength: number;
    iconMaxFileSizeMb: number;
    cost: number;
    isUsingTwoStepWebviewComponent: boolean;
  };
  recurringPayoutsConfiguration: {
    maxPayoutPartners: boolean;
  };
  roleConfiguration: {
    nameMaxLength: string;
    descriptionMaxLength: string;
    limit: number;
    cost: number;
    minRank: number;
    maxRank: number;
  };
  groupNameChangeConfiguration: {
    cost: number;
    cooldownInDays: number;
    ownershipCooldownInDays: number;
  };
  isPremiumPayoutsEnabled: boolean;
  isDefaultEmblemPolicyEnabled: boolean;
};

export type GroupMetaData = {
  groupLimit: number;
  currentGroupCount: number;
  groupStatusMaxLength: number;
  groupPostMaxLength: number;
  isGroupWallNotificationsEnabled: boolean;
  groupWallNotificationsSubscribeIntervalInMilliseconds: number;
  areProfileGroupsHidden: boolean;
  isGroupDetailsPolicyEnabled: boolean;
  showPreviousGroupNames: boolean;
};

export type GroupRoles = {
  data: {
    groupId: number;
    id: number;
    name: string;
    description: string;
    rank: number;
    memberCount: number;
  }[];
};

export type UserGroupRoles = {
  data: {
    group: {
      id: number;
      name: string;
      description: string;
      owner: {
        hasVerifiedBadge: boolean;
        userId: number;
        username: string;
        displayName: string;
      };
      shout: {
        body: string;
        poster: {
          hasVerifiedBadge: boolean;
          userId: boolean;
          username: string;
          displayName: string;
        };
        created: Date;
        updated: Date;
      };
      memberCount: number;
      publicEntryAllowed: boolean;
      isLocked: boolean;
      hasVerifiedBadge: boolean;
    };
    role: {
      id: number;
      name: string;
      description: string;
      rank: number;
      memberCount: number;
    };
    isPrimaryGroup: boolean;
  }[];
};

export type UserPrimaryGroup = {
  group: {
    id: number;
    name: string;
    description: string;
    owner: {
      hasVerifiedBadge: boolean;
      userId: number;
      username: string;
      displayName: string;
    };
    shout: {
      body: string;
      poster: {
        hasVerifiedBadge: boolean;
        userId: number;
        username: string;
        displayName: string;
      };
      created: Date;
      updated: Date;
    };
    memberCount: number;
    publicEntryAllowed: boolean;
    isLocked: boolean;
    hasVerifiedBadge: boolean;
  };
  role: {
    id: number;
    name: string;
    description: string;
    rank: number;
    memberCount: number;
  };
  isPrimaryGroup: boolean;
};

export type GroupSearchMetaData = {
  SuggestedGroupKeywords: string[];
  ShowFriendsGroupsSort: boolean;
};

export type GroupFunds = number;

type BaseGroup = {
  MultiGetGroupInfo(GroupIds: number[]): Promise<MultiGroupInfo>;
  GetGroupInfo(GroupId: number): Promise<GroupInfo>;
  GetGroupNameChangeHistory(
    GroupId: number,
    sortOrder?: 'Asc' | 'Desc',
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
  ): Promise<GroupNameChangeHistory>;
  GetUserRoleFromGroups(UserId: number): Promise<UserRoleFromGroups>;
  GetSocialLinks(GroupId: number): Promise<GroupSocialLinks>;
  GetWallPosts(
    GroupId: number,
    sortOrder?: 'Asc' | 'Desc',
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
  ): Promise<GroupWallPosts>;
  DeleteWallPost(GroupId: number, PostId: number): Promise<void>;
  DeleteUserWallPosts(GroupId: number, UserId: number): Promise<void>;
  GetGroupSettings(GroupId: number): Promise<GroupSettings>;
  GetConfigMetaData(): Promise<GroupConfigMetaData>;
  GetMetaData(): Promise<GroupMetaData>;
  GetRolesById(RoleIds: number[]): Promise<GroupRoles>;
  GetUserRoles(UserId: number): Promise<UserGroupRoles>;
  GetUserPrimaryGroup(UserId: number): Promise<UserPrimaryGroup>;
  SetClientPrimaryGroup(GroupId: number): Promise<void>;
  RemoveClientPrimaryGroup(): Promise<void>;
  ChangeGroupOwner(GroupId: number, UserId: number): Promise<void>;
  ClaimGroupOwnership(GroupId: number): Promise<void>;
  GetSearchMetaData(): Promise<GroupSearchMetaData>;
  GetGroupFunds(GroupId: number): Promise<GroupFunds>;
};
const Groups: BaseGroup = {
  MultiGetGroupInfo,
  GetGroupInfo,
  GetGroupNameChangeHistory,
  GetUserRoleFromGroups,
  GetSocialLinks,
  GetWallPosts,
  DeleteWallPost,
  DeleteUserWallPosts,
  GetGroupSettings,
  GetConfigMetaData,
  GetMetaData,
  GetRolesById,
  GetUserRoles,
  GetUserPrimaryGroup,
  SetClientPrimaryGroup,
  RemoveClientPrimaryGroup,
  ChangeGroupOwner,
  ClaimGroupOwnership,
  GetSearchMetaData,
  GetGroupFunds,
};

function MultiGetGroupInfo(GroupIds: number[]): Promise<MultiGroupInfo> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v2/groups?groupIds=${GroupIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetGroupInfo(GroupId: number): Promise<GroupInfo> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v1/groups/${GroupId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetGroupNameChangeHistory(
  GroupId: number,
  sortOrder?: 'Asc' | 'Desc',
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
): Promise<GroupNameChangeHistory> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://groups.roblox.com/v1/groups/${GroupId}/name-history`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://groups.roblox.com/v1/groups/${GroupId}/name-history?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://groups.roblox.com/v1/groups/${GroupId}/name-history?limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://groups.roblox.com/v1/groups/${GroupId}/name-history?sortOrder=${sortOrder}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder) {
      axios
        .get(`https://groups.roblox.com/v1/groups/${GroupId}/name-history?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit) {
      axios
        .get(`https://groups.roblox.com/v1/groups/${GroupId}/name-history?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!cursor) {
      axios
        .get(`https://groups.roblox.com/v1/groups/${GroupId}/name-history?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else {
      axios
        .get(
          `https://groups.roblox.com/v1/groups/${GroupId}/name-history?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`,
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

function GetUserRoleFromGroups(UserId: number): Promise<UserRoleFromGroups> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v2/users/${UserId}/groups/roles`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetSocialLinks(GroupId: number): Promise<GroupSocialLinks> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      Promise.reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://groups.roblox.com/v1/groups/${GroupId}/social-links`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetWallPosts(
  GroupId: number,
  sortOrder?: 'Asc' | 'Desc',
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
): Promise<GroupWallPosts> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://groups.roblox.com/v2/groups/${GroupId}/wall/posts`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://groups.roblox.com/v2/groups/${GroupId}/wall/posts?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://groups.roblox.com/v2/groups/${GroupId}/wall/posts?limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://groups.roblox.com/v2/groups/${GroupId}/wall/posts?sortOrder=${sortOrder}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder) {
      axios
        .get(`https://groups.roblox.com/v2/groups/${GroupId}/wall/posts?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit) {
      axios
        .get(`https://groups.roblox.com/v2/groups/${GroupId}/wall/posts?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!cursor) {
      axios
        .get(`https://groups.roblox.com/v2/groups/${GroupId}/wall/posts?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else {
      axios
        .get(
          `https://groups.roblox.com/v2/groups/${GroupId}/wall/posts?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`,
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

async function DeleteWallPost(GroupId: number, PostId: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios.delete(`https://groups.roblox.com/v1/groups/${GroupId}/wall/posts/${PostId}`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

async function DeleteUserWallPosts(GroupId: number, UserId: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios.delete(`https://groups.roblox.com/v1/groups/${GroupId}/wall/users/${UserId}/posts`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

function GetGroupSettings(GroupId: number): Promise<GroupSettings> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://groups.roblox.com/v1/groups/${GroupId}/settings`, {
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

function GetConfigMetaData(): Promise<GroupConfigMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v1/groups/configuration/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetMetaData(): Promise<GroupMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v1/groups/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetRolesById(RoleIds: number[]): Promise<GroupRoles> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v1/roles?ids=${RoleIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetUserRoles(UserId: number): Promise<UserGroupRoles> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v1/users/${UserId}/groups/roles`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetUserPrimaryGroup(UserId: number): Promise<UserPrimaryGroup> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v1/users/${UserId}/groups/primary/role`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function SetClientPrimaryGroup(GroupId: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://groups.roblox.com/v1/user/groups/primary`, {
      data: {
        groupId: GroupId,
      },
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

async function RemoveClientPrimaryGroup(): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios.delete(`https://groups.roblox.com/v1/user/groups/primary`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

async function ChangeGroupOwner(GroupId: number, UserId: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://groups.roblox.com/v1/groups/${GroupId}/change-owner`, {
      data: {
        userId: UserId,
      },
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

async function ClaimGroupOwnership(GroupId: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios.post(`https://groups.roblox.com/v1/groups/${GroupId}/claim-ownership`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

function GetSearchMetaData(): Promise<GroupSearchMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v1/groups/search/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetGroupFunds(GroupId: number): Promise<GroupFunds> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://economy.roblox.com/v1/groups/${GroupId}/currency`)
      .then((response) => {
        resolve(response.data.robux);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default Groups;

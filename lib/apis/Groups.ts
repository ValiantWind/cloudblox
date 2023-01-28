import axios from 'axios';

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

type BaseGroup = {
  GetGroupInfo(GroupId: number): Promise<GroupInfo>;
  GetGroupSettings(GroupId: number): Promise<GroupSettings>;
  GetConfigMetaData(): Promise<GroupConfigMetaData>;
  GetMetaData(): Promise<GroupMetaData>;
  GetRoleById(RoleIds: number[]): Promise<GroupRoles>;
  GetUserPrimaryGroup(UserId: number): Promise<UserPrimaryGroup>;
};
const Groups: BaseGroup = {
  GetGroupInfo,
  GetGroupSettings,
  GetConfigMetaData,
  GetMetaData,
  GetRoleById,
  GetUserPrimaryGroup,
};

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
        reject(error);
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
        reject(error);
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
        reject(error);
      });
  });
}

function GetRoleById(RoleIds: number[]): Promise<GroupRoles> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v1/roles?ids=${RoleIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
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
        reject(error);
      });
  });
}

export default Groups;

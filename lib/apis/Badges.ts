import axios from 'axios';

export type BadgeInfo = {
  id: number;
  name: string;
  description: string;
  displayName: string;
  displayDescription: string;
  isEnabled: boolean;
  iconImageId: number;
  displayIconImageId: number;
  created: Date;
  updated: Date;
  statistics: {
    pastDayAwardedCount: number;
    awardedCount: number;
    winRatePercentage: number;
  };
  awardingUniverse: {
    id: number;
    name: string;
    rootPlaceId: number;
  };
};

export type BadgeMetaData = {
  badgeCreationPrice: number;
  maxBadgeNameLength: number;
  maxBadgeDescriptionLength: number;
};

export type UserBadges = {
  previousPageCursor: string;
  nextPageCursor: string;
  data: BadgeInfo[];
};

export type UniverseBadges = {
  previousPageCursor: string;
  nextPageCursor: string;
  data: BadgeInfo[];
};

export type FreeBadgesQuota = number;

export type UserBadgeAwardDates = {
  badgeId: number;
  awardedDate: Date;
};

type BaseBadge = {
  GetBadgeInfo(BadgeId: number): Promise<BadgeInfo>;
  UpdateBadgeConfig(BadgeId: number, name: string, description: string, enabled: boolean): Promise<void>;
  GetMetaData(): Promise<BadgeMetaData>;
  GetUniverseBadges(
    UniverseId: number,
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
    sortOrder?: 'Asc' | 'Desc',
  ): Promise<UniverseBadges>;
  GetUserBadges(UserId: number): Promise<UserBadges>;
  GetFreeBadgesQuota(UniverseId: number): Promise<FreeBadgesQuota>;
  GetUserBadgeAwardDates(UserId: number, BadgeIds: number[]): Promise<UserBadgeAwardDates[]>;
  RemoveUserBadge(UserId: number, BadgeId: number): Promise<void>;
  RemoveClientBadge(BadgeId: number): Promise<void>;
};

const Badges: BaseBadge = {
  GetBadgeInfo,
  UpdateBadgeConfig,
  GetMetaData,
  GetUniverseBadges,
  GetUserBadges,
  GetFreeBadgesQuota,
  GetUserBadgeAwardDates,
  RemoveUserBadge,
  RemoveClientBadge,
};

function GetBadgeInfo(BadgeId: number): Promise<BadgeInfo> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://badges.roblox.com/v1/badges/${BadgeId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function UpdateBadgeConfig(BadgeId: number, name: string, description: string, enabled: boolean): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .patch(`https://badges.roblox.com/v1/badges/${BadgeId}`, {
      name,
      description,
      enabled,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

function GetMetaData(): Promise<BadgeMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://badges.roblox.com/v1/badges/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetUniverseBadges(
  UniverseId: number,
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
  sortOrder?: 'Asc' | 'Desc',
): Promise<UniverseBadges> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://badges.roblox.com/v1/universes/${UniverseId}/badges`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://badges.roblox.com/v1/universes/${UniverseId}/badges?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://badges.roblox.com/v1/universes/${UniverseId}/badges?limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://badges.roblox.com/v1/universes/${UniverseId}/badges?sortOrder=${sortOrder}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder) {
      axios
        .get(`https://badges.roblox.com/v1/universes/${UniverseId}/badges?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit) {
      axios
        .get(`https://badges.roblox.com/v1/universes/${UniverseId}/badges?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!cursor) {
      axios
        .get(`https://badges.roblox.com/v1/universes/${UniverseId}/badges?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else {
      axios
        .get(
          `https://badges.roblox.com/v1/universes/${UniverseId}/badges?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`,
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

function GetUserBadges(UserId: number): Promise<UserBadges> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://badges.roblox.com/v1/users/${UserId}/badges`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetFreeBadgesQuota(UniverseId: number): Promise<FreeBadgesQuota> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://badges.roblox.com/v1/universes/${UniverseId}/free-badges-quota`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetUserBadgeAwardDates(UserId: number, BadgeIds: number[]): Promise<UserBadgeAwardDates[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://badges.roblox.com/v1/users/${UserId}/badges/awarded-dates?badgeIds=${BadgeIds.join(',')}`)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function RemoveUserBadge(UserId: number, BadgeId: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios.delete(`https://badges.roblox.com/v1/user/${UserId}/badges/${BadgeId}`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

async function RemoveClientBadge(BadgeId: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios.delete(`https://badges.roblox.com/v1/user/badges/${BadgeId}`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

export default Badges;

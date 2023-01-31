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

type BaseBadge = {
  GetBadgeInfo(BadgeId: number): Promise<BadgeInfo>;
  GetMetaData(): Promise<BadgeMetaData>;
  GetUniverseBadges(UniverseId: number): Promise<UniverseBadges>;
  GetUserBadges(UserId: number): Promise<UserBadges>;
  GetFreeBadgesQuota(UniverseId: number): Promise<FreeBadgesQuota>;
};

const Badges: BaseBadge = {
  GetBadgeInfo,
  GetMetaData,
  GetUniverseBadges,
  GetUserBadges,
  GetFreeBadgesQuota,
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

function GetUniverseBadges(UniverseId: number): Promise<UniverseBadges> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://badges.roblox.com/v1/universes/${UniverseId}/badges`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
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

export default Badges;

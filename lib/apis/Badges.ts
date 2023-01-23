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

type BaseBadge = {
  GetBadgeInfo(BadgeId: number): Promise<BadgeInfo>;
  GetUniverseBadges(UniverseId: number): Promise<UniverseBadges>;
  GetUserBadges(UserId: number): Promise<UserBadges>;
};

const Badges: BaseBadge = {
  GetBadgeInfo,
  GetUniverseBadges,
  GetUserBadges,
};

function GetBadgeInfo(BadgeId: number): Promise<BadgeInfo> {
  return new Promise((resolve, reject) => {
    axios
      .get(`badges.roblox.com/v1/badges/${BadgeId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function GetUniverseBadges(UniverseId: number): Promise<UniverseBadges> {
  return new Promise((resolve, reject) => {
    axios
      .get(`badges.roblox.com/v1/universes/${UniverseId}/badges`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
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
        reject(error);
      });
  });
}

export default Badges;

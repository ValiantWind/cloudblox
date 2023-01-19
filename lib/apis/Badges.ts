import axios from 'axios';

const Badges: any = {};

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

Badges.GetBadgeInfo = (BadgeId: number): Promise<BadgeInfo> => {
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
};

export default Badges;

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

type BaseGroup = {
  GetGroupInfo(GroupId: number): Promise<GroupInfo>;
};
const Groups: BaseGroup = {
  GetGroupInfo,
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

export default Groups;

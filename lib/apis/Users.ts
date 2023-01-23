import axios from 'axios';

export type UserInfo = {
  description: string;
  created: Date;
  isBanned: boolean;
  hasVerifiedBadge: boolean;
  id: number;
  name: string;
  displayName: string;
};

type BaseUser = {
  GetUserInfo(UserId: number): Promise<UserInfo>;
};

const Users: BaseUser = {
  GetUserInfo,
};

function GetUserInfo(UserId: number): Promise<UserInfo> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://users.roblox.com/v1/users/${UserId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export default Users;

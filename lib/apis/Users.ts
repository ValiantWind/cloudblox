import axios from 'axios';

// const Users : any = {};

export declare type UserInfo = {
  description: string;
  joinDate: Date;
  isBanned: boolean;
  isVerified: boolean;
  username: string;
  displayName: string;
};

const Users: any = {};

Users.GetUserInfo = (UserId: number): Promise<UserInfo> => {
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
};

export default Users;

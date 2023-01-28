import axios from 'axios';

export type LastOnline = {
  lastOnlineTimestamps: {
    userId: number;
    lastOnline: Date;
  }[];
};

type BasePresence = {
  GetLastOnline(UserIds: number[]): Promise<LastOnline>;
};

const Presence: BasePresence = {
  GetLastOnline,
};

function GetLastOnline(UserIds: number[]): Promise<LastOnline> {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://presence.roblox.com/v1/presence/last-online`, {
        userIds: [UserIds.join(',')],
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Presence;

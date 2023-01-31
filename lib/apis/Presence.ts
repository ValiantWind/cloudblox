import axios from 'axios';

export type LastOnline = {
  lastOnlineTimestamps: {
    userId: number;
    lastOnline: Date;
  }[];
};

type BasePresence = {
  GetLastOnline(UserIds: number[]): Promise<LastOnline>;
  RegisterClientAppPresence(location: string, PlaceId: number, disconnect: boolean): Promise<void>;
};

const Presence: BasePresence = {
  GetLastOnline,
  RegisterClientAppPresence,
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
        reject(new Error(error));
      });
  });
}

async function RegisterClientAppPresence(location: string, PlaceId: number, disconnect: boolean): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://presence.roblox.com/v1/presence/register-app-presence`, {
      location,
      placeId: PlaceId,
      disconnect,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

export default Presence;

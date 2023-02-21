import axios from 'axios';

export type ClientPinStatus = {
  isEnabled: boolean;
  unlockedUntil: number | null;
};

export type AuthMetaData = {
  cookieLawNoticeTimeout: number;
};

type BaseAuth = {
  GetClientPinStatus(): Promise<ClientPinStatus>;
  GetAuthMetaData(): Promise<AuthMetaData>;
};

const Auth = {
  GetClientPinStatus,
  GetAuthMetaData,
};

function GetClientPinStatus(): Promise<ClientPinStatus> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://auth.roblox.com/v1/account/pin`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetAuthMetaData(): Promise<AuthMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://auth.roblox.com/v1/auth/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default Auth;

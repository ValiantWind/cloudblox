import axios from 'axios';
import Client from '../client';

export type UserInfo = {
  description: string;
  created: Date;
  isBanned: boolean;
  hasVerifiedBadge: boolean;
  id: number;
  name: string;
  displayName: string;
};

export type UsernameHistory = {
  previousPageCursor: string;
  nextPageCursor: string;
  data: {
    name: string;
  }[];
};

export type ClientUserInfo = {
  id: number;
  name: string;
  displayName: string;
};

export type ClientAgeBracket = {
  ageBracket: number;
};

export type ClientCountryCode = {
  countryCode: string;
};

type BaseUser = {
  GetUserInfo(UserId: number): Promise<UserInfo>;
  GetClientUserInfo(): Promise<ClientUserInfo>;
  GetUsernameHistory(
    UserId: number,
    sortOrder?: 'Asc' | 'Desc',
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
  ): Promise<UsernameHistory>;
  GetClientAgeBracket(): Promise<ClientAgeBracket>;
  GetClientCountryCode(): Promise<ClientCountryCode>;
};

const Users: BaseUser = {
  GetUserInfo,
  GetClientUserInfo,
  GetUsernameHistory,
  GetClientAgeBracket,
  GetClientCountryCode,
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

function GetClientUserInfo(): Promise<ClientUserInfo> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://users.roblox.com/v1/users/authenticated`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetUsernameHistory(
  UserId: number,
  sortOrder?: 'Asc' | 'Desc',
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
): Promise<UsernameHistory> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://users.roblox.com/v1/users/${UserId}/username-history`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://users.roblox.com/v1/users/${UserId}?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://users.roblox.com/v1/users/${UserId}?limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://users.roblox.com/v1/users/${UserId}?sortOrder=${sortOrder}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder) {
      axios
        .get(`https://users.roblox.com/v1/users/${UserId}?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit) {
      axios
        .get(`https://users.roblox.com/v1/users/${UserId}?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!cursor) {
      axios
        .get(`https://users.roblox.com/v1/users/${UserId}?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      axios
        .get(`https://users.roblox.com/v1/users/${UserId}?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

function GetClientAgeBracket(): Promise<ClientAgeBracket> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://users.roblox.com/v1/users/authenticated/age-bracket`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetClientCountryCode(): Promise<ClientCountryCode> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://users.roblox.com/v1/users/authenticated/country-code`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Users;

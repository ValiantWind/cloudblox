import axios, { AxiosResponse } from 'axios';

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

export type ClientAgeBracket = number;

export type ClientCountryCode = string;

export type UserIdFromName = number;

type BaseUser = {
  SetClientDisplayName(DisplayName: string): Promise<void>;
  GetUserInfo(UserId: number): Promise<UserInfo>;
  GetIdFromUsername(Username: string): Promise<UserIdFromName>;
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
  SetClientDisplayName,
  GetUserInfo,
  GetIdFromUsername,
  GetClientUserInfo,
  GetUsernameHistory,
  GetClientAgeBracket,
  GetClientCountryCode,
};

async function SetClientDisplayName(DisplayName: string): Promise<void> {
  const UserId = (await GetClientUserInfo()).id;
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://users.roblox.com/v1/users/${UserId}/display-names`, {
      newDisplayName: DisplayName,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

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

function GetIdFromUsername(Username: string): Promise<UserIdFromName> {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://users.roblox.com/v1/usernames/users`, {
        usernames: [Username],
        excludeBannedUsers: false,
      })
      .then((response) => {
        resolve(response.data.data[0].id);
      })
      .catch((error) => {
        reject(new Error(error));
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
        resolve(response.data.ageBracket);
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
        resolve(response.data.countryCode);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Users;

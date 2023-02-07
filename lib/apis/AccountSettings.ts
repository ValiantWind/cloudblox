import axios from 'axios';

export type AccountSettingsMetaData = {
  IsAccountsRestrictionsSpamBugFixEnabled: boolean;
  MaximumParentalControlsMonthlySpendLimitInUSD: boolean;
  IsParentalMonthlyLimitInUIEnabled: boolean;
  IsParentalNotificationSettingsInUIEnabled: boolean;
  IsContentControlsEnabled: boolean;
};

export type ClientBlockedUsers = {
  blockedUsers: {
    userId: number;
    name: string;
    displayName: string;
  }[];
};

export type ClientEmailDetails = {
  emailAddress: string;
  verified: boolean;
  canBypassPasswordForEmailUpdate: boolean;
};

type BaseAccountSettings = {
  GetMetaData(): Promise<AccountSettingsMetaData>;
  GetClientAppChatPrivacy(): Promise<string>;
  GetClientGameChatPrivacy(): Promise<string>;
  GetClientInventoryPrivacy(): Promise<string>;
  GetClientPrivateMessagePrivacy(): Promise<string>;
  GetClientEmailDetails(): Promise<ClientEmailDetails>;
  GetClientBlockedUsers(): Promise<ClientBlockedUsers>;
  BlockUser(UserId: number): Promise<void>;
  UnblockUser(UserId: number): Promise<void>;
};

const AccountSettings: BaseAccountSettings = {
  GetMetaData,
  GetClientAppChatPrivacy,
  GetClientGameChatPrivacy,
  GetClientInventoryPrivacy,
  GetClientPrivateMessagePrivacy,
  GetClientEmailDetails,
  GetClientBlockedUsers,
  BlockUser,
  UnblockUser,
};

function GetMetaData(): Promise<AccountSettingsMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://accountsettings.roblox.com/v1/account/settings/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetClientAppChatPrivacy(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      Promise.reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountsettings.roblox.com/v1/app-chat-privacy`)
      .then((response) => {
        resolve(response.data.appChatPrivacy);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetClientGameChatPrivacy(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      Promise.reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountsettings.roblox.com/v1/game-chat-privacy`)
      .then((response) => {
        resolve(response.data.gameChatPrivacy);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetClientInventoryPrivacy(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      Promise.reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountsettings.roblox.com/v1/inventory-privacy`)
      .then((response) => {
        resolve(response.data.inventoryPrivacy);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetClientPrivateMessagePrivacy(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      Promise.reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountsettings.roblox.com/v1/private-message-privacy`)
      .then((response) => {
        resolve(response.data.privateMessagePrivacy);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetClientEmailDetails(): Promise<ClientEmailDetails> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      Promise.reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountsettings.roblox.com/v1/email`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetClientBlockedUsers(): Promise<ClientBlockedUsers> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://accountsettings.roblox.com/v1/users/get-detailed-blocked-users`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function BlockUser(UserId: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios.post(`https://accountsettings.roblox.com/v1/users/${UserId}/block`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

async function UnblockUser(UserId: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios.post(`https://accountsettings.roblox.com/v1/users/${UserId}/unblock`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

export default AccountSettings;

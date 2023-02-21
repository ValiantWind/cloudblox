import axios from 'axios';

export type ClientBirthdate = {
  birthMonth: number;
  birthDay: number;
  birthYear: number;
};

export type ClientXboxLoginStreakInDays = {
  count: number;
};

export type ClientStarCodeAffiliateInfo = {
  userId: number;
  name: string;
  code: string;
};

export type UserRobloxBadges = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export type AccountInfoMetaData = {
  isAllowedNotificationsEndpointDisabled: boolean;
  isAccountSettingsPolicyEnabled: boolean;
  isPhoneNumberEnabled: boolean;
  MaxUserDescriptionLength: number;
  isUserDescriptionEnabled: boolean;
  isUserBlockEndpointsUpdated: boolean;
  isIDVerificationEnabled: boolean;
  isPasswordRequiredForAgingDown: boolean;
};

export type ClientPhoneInformation = {
  countryCode: string;
  prefix: string;
  isVerified: boolean;
  verificationCodeLength: number;
  canBypassPasswordForPhoneUpdate: boolean;
};

export type ClientPromotionChannels = {
  promotionChannelsVisibilityPrivacy: string;
  facebook: string;
  twitter: string;
  youtube: string;
  twitch: string;
  guilded: string;
};

export type UserPromotions = {
  facebook: string;
  twitter: string;
  youtube: string;
  twitch: string;
  guilded: string;
};

export type VerifiedUserHatAssetId = {
  verifiedUserHatAssetId: number;
};

export type ClientDescription = string;
export type ClientGender = string;

type BaseAccountInfo = {
  GetClientBirthdate(): Promise<ClientBirthdate>;
  UpdateClientBirthdate(birthMonth: number, birthDay: number, birthYear: number, clientPassword: string): Promise<void>;
  GetClientDescription(): Promise<ClientDescription>;
  SetClientDescription(description: string): Promise<void>;
  GetClientGender(): Promise<ClientGender>;
  SetClientGender(gender: string): Promise<void>;
  GetClientXboxLoginStreak(): Promise<ClientXboxLoginStreakInDays>;
  GetMetaData(): Promise<AccountInfoMetaData>;
  GetClientPhoneInfo(): Promise<ClientPhoneInformation>;
  SetClientPhoneInfo(CountryCode: string, prefix: string, PhoneNumber: string, password: string): Promise<void>;
  DeleteClientPhone(CountryCode: string, prefix: string, PhoneNumber: string, password: string): Promise<void>;
  ResendPhoneValidationCode(CountryCode: string, prefix: string, PhoneNumber: string, password: string): Promise<void>;
  VerifyClientPhone(code: number): Promise<void>;
  GetClientPromotions(): Promise<ClientPromotionChannels>;
  SetClientPromotions(
    Facebook: string,
    Twitter: string,
    Youtube: string,
    Twitch: string,
    Guilded: string,
    PromotionsVisible: boolean,
  ): Promise<void>;
  GetUserPromotions(UserId: number): Promise<UserPromotions>;
  RemoveClientStarCodeAffiliate(): Promise<void>;
  GetClientStarCodeAffiliate(): Promise<ClientStarCodeAffiliateInfo>;
  AddClientStarCodeAffiliate(code: string): Promise<ClientStarCodeAffiliateInfo>;
  GetUserRobloxBadges(UserId: number): Promise<UserRobloxBadges[]>;
  VerifyClientEmail(ticket: string): Promise<VerifiedUserHatAssetId>;
};

const AccountInformation: BaseAccountInfo = {
  GetClientBirthdate,
  UpdateClientBirthdate,
  GetClientDescription,
  SetClientDescription,
  GetClientGender,
  SetClientGender,
  GetClientXboxLoginStreak,
  GetMetaData,
  GetClientPhoneInfo,
  SetClientPhoneInfo,
  DeleteClientPhone,
  ResendPhoneValidationCode,
  VerifyClientPhone,
  GetClientPromotions,
  SetClientPromotions,
  GetUserPromotions,
  RemoveClientStarCodeAffiliate,
  GetClientStarCodeAffiliate,
  AddClientStarCodeAffiliate,
  GetUserRobloxBadges,
  VerifyClientEmail,
};

function GetClientBirthdate(): Promise<ClientBirthdate> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountinformation.roblox.com/v1/birthdate`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function UpdateClientBirthdate(
  birthMonth: number,
  birthDay: number,
  birthYear: number,
  clientPassword: string,
): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://accountinformation.roblox.com/v1/birthdate`, {
      birthMonth,
      birthDay,
      birthYear,
      password: clientPassword,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

function GetClientDescription(): Promise<ClientDescription> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountinformation.roblox.com/v1/description`)
      .then((response) => {
        resolve(response.data.description);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function SetClientDescription(description: string): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://accountinformation.roblox.com/v1/description`, {
      description,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

function GetClientGender(): Promise<ClientGender> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountinformation.roblox.com/v1/gender`)
      .then((response) => {
        resolve(response.data.gender);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetClientXboxLoginStreak(): Promise<ClientXboxLoginStreakInDays> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountinformation.roblox.com/v1/gender`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function SetClientGender(gender: string): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://accountinformation.roblox.com/v1/gender`, {
      gender,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

function GetMetaData(): Promise<AccountInfoMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://accountinformation.roblox.com/v1/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetClientPhoneInfo(): Promise<ClientPhoneInformation> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountinformation.roblox.com/v1/phone`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function SetClientPhoneInfo(
  CountryCode: string,
  prefix: string,
  PhoneNumber: string,
  password: string,
): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://accountinformation.roblox.com/v1/phone`, {
      countryCode: CountryCode,
      prefix,
      phone: PhoneNumber,
      password,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

async function DeleteClientPhone(
  CountryCode: string,
  prefix: string,
  PhoneNumber: string,
  password: string,
): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://accountinformation.roblox.com/v1/phone/delete`, {
      countryCode: CountryCode,
      prefix,
      phone: PhoneNumber,
      password,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

async function ResendPhoneValidationCode(
  CountryCode: string,
  prefix: string,
  PhoneNumber: string,
  password: string,
): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://accountinformation.roblox.com/v1/phone/resend`, {
      countryCode: CountryCode,
      prefix,
      phone: PhoneNumber,
      password,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

async function VerifyClientPhone(code: number): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://accountinformation.roblox.com/v1/phone/verify`, {
      code,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

function GetClientPromotions(): Promise<ClientPromotionChannels> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountinformation.roblox.com/v1/promotion-channels`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function SetClientPromotions(
  Facebook: string,
  Twitter: string,
  Youtube: string,
  Twitch: string,
  Guilded: string,
  PromotionsVisible: boolean,
): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }
  axios
    .post(`https://accountinformation.roblox.com/v1/phone/promotion-channels`, {
      facebook: Facebook,
      twitter: Twitter,
      youtube: Youtube,
      twitch: Twitch,
      guilded: Guilded,
      promotionChannelsVisibilityPrivacy: PromotionsVisible,
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

function GetUserPromotions(UserId: number): Promise<UserPromotions> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://accountinformation.roblox.com/v1/users/${UserId}/promotion-channel`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

async function RemoveClientStarCodeAffiliate(): Promise<void> {
  if (!axios.defaults.headers.common[`Cookie`]) {
    Promise.reject(new Error('No cookie has been set.'));
  }

  axios.delete(`https://accountinformation.roblox.com/v1/star-code-affiliates`).catch((error) => {
    Promise.reject(new Error(error));
  });
}

function GetClientStarCodeAffiliate(): Promise<ClientStarCodeAffiliateInfo> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      Promise.reject(new Error('No cookie has been set.'));
    }
    axios
      .get(`https://accountinformation.roblox.com/v1/star-code-affiliates`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function AddClientStarCodeAffiliate(code: string): Promise<ClientStarCodeAffiliateInfo> {
  return new Promise((resolve, reject) => {
    if (!axios.defaults.headers.common[`Cookie`]) {
      Promise.reject(new Error('No cookie has been set.'));
    }
    axios
      .post(`https://accountinformation.roblox.com/v1/star-code-affiliates`, {
        code,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetUserRobloxBadges(UserId: number): Promise<UserRobloxBadges[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://accountinformation.roblox.com/v1/users/${UserId}/roblox-badges`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function VerifyClientEmail(ticket: string): Promise<VerifiedUserHatAssetId> {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://accountinformation.roblox.com/v1/email/verify`, {
        ticket,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default AccountInformation;

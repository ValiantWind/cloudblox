import axios from "axios";
import request from "../request";

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
    getClientBirthdate(): Promise<ClientBirthdate>;
    updateClientBirthdate(birthMonth: number, birthDay: number, birthYear: number, clientPassword: string): Promise<void>;
    getClientDescription(): Promise<ClientDescription>;
    setClientDescription(description: string): Promise<void>;
    getClientGender(): Promise<ClientGender>;
    setClientGender(gender: string): Promise<void>;
    getClientXboxLoginStreak(): Promise<ClientXboxLoginStreakInDays>;
    getMetaData(): Promise<AccountInfoMetaData>;
    getClientPhoneInfo(): Promise<ClientPhoneInformation>;
    setClientPhoneInfo(CountryCode: string, prefix: string, PhoneNumber: string, password: string): Promise<void>;
    deleteClientPhone(CountryCode: string, prefix: string, PhoneNumber: string, password: string): Promise<void>;
    resendPhoneValidationCode(CountryCode: string, prefix: string, PhoneNumber: string, password: string): Promise<void>;
    verifyClientPhone(code: number): Promise<void>;
    getClientPromotions(): Promise<ClientPromotionChannels>;
    setClientPromotions(
        Facebook: string,
        Twitter: string,
        Youtube: string,
        Twitch: string,
        Guilded: string,
        PromotionsVisible: boolean,
    ): Promise<void>;
    getUserPromotions(UserId: number): Promise<UserPromotions>;
    removeClientStarCodeAffiliate(): Promise<void>;
    getClientStarCodeAffiliate(): Promise<ClientStarCodeAffiliateInfo>;
    addClientStarCodeAffiliate(code: string): Promise<ClientStarCodeAffiliateInfo>;
    getUserRobloxBadges(UserId: number): Promise<UserRobloxBadges[]>;
    verifyClientEmail(ticket: string): Promise<VerifiedUserHatAssetId>;
};

const AccountInformation: BaseAccountInfo = {
    getClientBirthdate,
    updateClientBirthdate,
    getClientDescription,
    setClientDescription,
    getClientGender,
    setClientGender,
    getClientXboxLoginStreak,
    getMetaData,
    getClientPhoneInfo,
    setClientPhoneInfo,
    deleteClientPhone,
    resendPhoneValidationCode,
    verifyClientPhone,
    getClientPromotions,
    setClientPromotions,
    getUserPromotions,
    removeClientStarCodeAffiliate,
    getClientStarCodeAffiliate,
    addClientStarCodeAffiliate,
    getUserRobloxBadges,
    verifyClientEmail
};

function getClientBirthdate (): Promise<ClientBirthdate> {
    return new Promise((resolve, reject) => {
        request({
            method: "get",
            url: `https://accountinformation.roblox.com/v1/birthdate`,
            requiresAuth: true
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
}

async function updateClientBirthdate (
    birthMonth: number,
    birthDay: number,
    birthYear: number,
    clientPassword: string
): Promise<void> {
    await request({
        method: "post",
        url: `https://accountinformation.roblox.com/v1/birthdate`,
		 			data: {
            birthMonth,
            birthDay,
            birthYear,
            clientPassword
        },
        requiresAuth: true
    }).catch(error => {
        Promise.reject(error);
    });
}

function getClientDescription (): Promise<ClientDescription> {
    return new Promise((resolve, reject) => {
        request({
            method: "get",
            url: `https://accountinformation.roblox.com/v1/description`,
            requiresAuth: true
        }).then(response => {
            resolve(response.data.description);
        })
            .catch(error => {
                reject(error);
            });
    });
}

async function setClientDescription (description: string): Promise<void> {
  await request({
            method: "post",
            url: `https://accountinformation.roblox.com/v1/description`,
            requiresAuth: true,
						data: {
							description
						}
        })
  					.catch(error => {
                Promise.reject(error);
            });
}

function getClientGender (): Promise<ClientGender> {
    return new Promise((resolve, reject) => {
        request({
            method: "get",
            url: `https://accountinformation.roblox.com/v1/gender`,
            requiresAuth: true
        }).then(response => {
					resolve(response.data.gender)
				})
  					.catch(error => {
                reject(error);
            });
    });
}

function getClientXboxLoginStreak (): Promise<ClientXboxLoginStreakInDays> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://accountinformation.roblox.com/v1/xbox-live`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function setClientGender (gender: string): Promise<void> {
    await request({
            method: "get",
            url: `https://accountinformation.roblox.com/v1/gender`,
            requiresAuth: true,
						data: {
							gender
						}
				})
  					.catch(error => {
                Promise.reject(error);
            });
}

function getMetaData (): Promise<AccountInfoMetaData> {
    return new Promise((resolve, reject) => {
  		request({
            method: "get",
            url: `https://accountinformation.roblox.com/v1/metadata`
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
}

function getClientPhoneInfo (): Promise<ClientPhoneInformation> {
    return new Promise((resolve, reject) => {
        request({
            method: "get",
            url: `https://accountinformation.roblox.com/v1/phone`
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
}

async function setClientPhoneInfo (
    countryCode: string,
    prefix: string,
    phoneNumber: string,
    password: string,
): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://accountinformation.roblox.com/v1/phone`, {
            countryCode,
            prefix,
            phone: phoneNumber,
            password
        })
        .catch(error => {
            Promise.reject(error);
        });
}

async function deleteClientPhone (
    CountryCode: string,
    prefix: string,
    PhoneNumber: string,
    password: string,
): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://accountinformation.roblox.com/v1/phone/delete`, {
            countryCode: CountryCode,
            prefix,
            phone: PhoneNumber,
            password
        })
        .catch(error => {
            Promise.reject(error);
        });
}

async function resendPhoneValidationCode (
    CountryCode: string,
    prefix: string,
    PhoneNumber: string,
    password: string,
): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://accountinformation.roblox.com/v1/phone/resend`, {
            countryCode: CountryCode,
            prefix,
            phone: PhoneNumber,
            password
        })
        .catch(error => {
            Promise.reject(error);
        });
}

async function verifyClientPhone (code: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://accountinformation.roblox.com/v1/phone/verify`, {
            code
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getClientPromotions (): Promise<ClientPromotionChannels> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://accountinformation.roblox.com/v1/promotion-channels`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function setClientPromotions (
    Facebook: string,
    Twitter: string,
    Youtube: string,
    Twitch: string,
    Guilded: string,
    PromotionsVisible: boolean,
): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://accountinformation.roblox.com/v1/phone/promotion-channels`, {
            facebook: Facebook,
            twitter: Twitter,
            youtube: Youtube,
            twitch: Twitch,
            guilded: Guilded,
            promotionChannelsVisibilityPrivacy: PromotionsVisible
        })
        .catch(error => {
            Promise.reject(error);
        });
}

function getUserPromotions (UserId: number): Promise<UserPromotions> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://accountinformation.roblox.com/v1/users/${UserId}/promotion-channel`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function removeClientStarCodeAffiliate (): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }

    await axios.delete(`https://accountinformation.roblox.com/v1/star-code-affiliates`).catch(error => {
        Promise.reject(error);
    });
}

function getClientStarCodeAffiliate (): Promise<ClientStarCodeAffiliateInfo> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://accountinformation.roblox.com/v1/star-code-affiliates`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function addClientStarCodeAffiliate (Code: string): Promise<ClientStarCodeAffiliateInfo> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .post(`https://accountinformation.roblox.com/v1/star-code-affiliates`, {
                code: Code
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(new Error(error));
            });
    });
}

function getUserRobloxBadges (UserId: number): Promise<UserRobloxBadges[]> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://accountinformation.roblox.com/v1/users/${UserId}/roblox-badges`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(new Error(error));
            });
    });
}

function verifyClientEmail (Ticket: string): Promise<VerifiedUserHatAssetId> {
    return new Promise((resolve, reject) => {
        axios
            .post(`https://accountinformation.roblox.com/v1/email/verify`, {
                ticket: Ticket
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(new Error(error));
            });
    });
}

export default AccountInformation;

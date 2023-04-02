import BaseAPI from "./Base";
import Client from "../client";

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


class BaseAccountInformation extends BaseAPI {
    constructor (client?: Client) {
        super({
            baseUrl: "https://accountinformation.roblox.com/",
            client
        });
    }

    getClientBirthdate (): Promise<ClientBirthdate> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/birthdate`,
                requiresAuth: true
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    async updateClientBirthdate (birthMonth: number, birthDay: number, birthYear: number, clientPassword: number): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/birthdate",
            requiresAuth: true,
            data: {
                birthMonth,
                birthDay,
                birthYear,
                clientPassword
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getClientDescription (): Promise<ClientDescription> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/description`,
                requiresAuth: true
            }).then(response => {
                resolve(response.data.description);
            })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async setClientDescription (description: string): Promise<void> {
        await this.request({
            method: "post",
            path: `v1/description`,
            requiresAuth: true,
            data: {
                description
            }
        })
            .catch(error => {
                Promise.reject(error);
            });
    }

    getClientGender (): Promise<ClientGender> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/gender`,
                requiresAuth: true
            }).then(response => {
                resolve(response.data.gender);
            })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async setClientGender (gender: string): Promise<void> {
        await this.request({
            method: "get",
            path: `v1/gender`,
            requiresAuth: true,
            data: {
                gender
            }
        })
            .catch(error => {
                Promise.reject(error);
            });
    }

    getClientXboxLoginStreak (): Promise<ClientXboxLoginStreakInDays> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/xbox-live/consecutive-login-days`,
                requiresAuth: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getMetaData (): Promise<AccountInfoMetaData> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/metadata`,
                requiresAuth: false
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    getClientPhoneInfo (): Promise<ClientPhoneInformation> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/phone`,
                requiresAuth: true
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    async setClientPhoneInfo (
        countryCode: string,
        prefix: string,
        phoneNumber: string,
        password: string,
    ): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/phone",
            requiresAuth: true,
            data: {
                countryCode,
                prefix,
                phone: phoneNumber,
                password
            }
        }).catch(error => {
            Promise.reject(error);
        });
    }

    async deleteClientPhone (
        countryCode: string,
        prefix: string,
        phoneNumber: string,
        password: string,
    ): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/phone/delete",
            requiresAuth: true,
            data: {
                countryCode,
                prefix,
                phone: phoneNumber,
                password
            }
        })
            .catch(error => {
                Promise.reject(error);
            });
    }

    async resendPhoneValidationCode (
        countryCode: string,
        prefix: string,
        phoneNumber: string,
        password: string,
    ): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/phone/resend",
            requiresAuth: true,
            data: {
                countryCode,
                prefix,
                phone: phoneNumber,
                password
            }
        })
            .catch(error => {
                Promise.reject(error);
            });
    }

    async verifyClientPhone (code: number): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/phone/verify",
            requiresAuth: true,
            data: {
                code
            }
        })
            .catch(error => {
                Promise.reject(error);
            });
    }

    getClientPromotions (): Promise<ClientPromotionChannels> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/promotion-channels",
                requiresAuth: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async setClientPromotions (
        facebook: string,
        twitter: string,
        youtube: string,
        twitch: string,
        guilded: string,
        promotionsVisible: boolean,
    ): Promise<void> {
        await this.request({
            method: "post",
            path: "v1/phone/promotion-channels",
            requiresAuth: true,
            data: {
                facebook,
                twitter,
                youtube,
                twitch,
                guilded,
                promotionChannelsVisibilityPrivacy: promotionsVisible
            }
        })
            .catch(error => {
                Promise.reject(error);
            });
    }

    getUserPromotions (userId: number): Promise<UserPromotions> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/promotion-channel`,
                requiresAuth: false
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getClientStarCodeAffiliate (): Promise<ClientStarCodeAffiliateInfo> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/star-code-affiliates",
                requiresAuth: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    addClientStarCodeAffiliate (code: string): Promise<ClientStarCodeAffiliateInfo> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/star-code-affiliates",
                requiresAuth: true,
                data: {
                    code
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async removeClientStarCodeAffiliate (): Promise<void> {
        await this.request({
            method: "delete",
            path: "v1/star-code-affiliates",
            requiresAuth: true
        }).catch(error => {
            Promise.reject(error);
        });
    }

    getUserRobloxBadges (userId: number): Promise<UserRobloxBadges[]> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/roblox-badges`,
                requiresAuth: false
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    verifyClientEmail (ticket: string): Promise<VerifiedUserHatAssetId> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: "v1/email/verify",
                requiresAuth: true,
                data: {
                    ticket
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

const AccountInformation = new BaseAccountInformation();

export default AccountInformation;

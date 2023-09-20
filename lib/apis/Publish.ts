import Client from "../client";
import Base from "./Base";
import axios, { AxiosRequestConfig } from "axios";
import fs from "fs";

type AssetQuota = {
    duration: string;
    usage: number;
    capacity: number;
    expirationTime: string;
};

export type UploadedAudioDetails = {
    Id: number;
    Name: string;
};

export type AssetQuotas = {
    quotas: AssetQuota[];
};

class BasePublishing extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://publish.roblox.com/",
            client
        });
    }

    getAssetQuotas (resourceType: string, assetType: string): Promise<AssetQuotas[]> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: "v1/asset-quotas",
                authRequired: true,
                params: {
                    resourceType,
                    assetType
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

    updateAudio (): PublishUserAudioBuilder {
        return new PublishUserAudioBuilder();
    }
}

class PublishUserAudioBuilder {
    private name: string;
    private filePath: string;
    private paymentSource: string;
    private estimatedFileSize: number;
    private estimatedAudioDuration: number;
    private audioPrivacyType: number;

    constructor () {
        this.create();
    }

    setName (name: string) {
        this.name = name;
        return this;
    }

    setFile (filePath: string) {
        this.filePath = filePath;
        return this;
    }

    setEstimatedFileSize (bytes: number) {
        this.estimatedFileSize = bytes;
        return this;
    }

    setEstimatedAudioDuration (seconds: number) {
        this.estimatedAudioDuration = seconds;
        return this;
    }

    setPrivacyType (privacyType: 1 | 2) {
        this.audioPrivacyType = privacyType;
    }

    create (): Promise<UploadedAudioDetails> {
        return new Promise((resolve, reject) => {
            if (!axios.defaults.headers.common.Cookie) {
                reject(new Error("No cookie has been set."));
            }
            if (!this.name) {
                reject(new Error("Please set the audio name. (Use .setName(audioName))"));
            }
            if (!this.filePath) {
                reject(new Error("Please set the audio file. (Use .setFile(filePath))"));
            }
            if (!this.estimatedFileSize) {
                reject(new Error("Please set the estimated audio file size. (Use .setEstimatedFileSize(bytes))"));
            }
            if (!this.estimatedAudioDuration) {
                reject(new Error("Please set the estimated audio duration. (Use .setEstimatedFileSize(seconds))"));
            }
            if (!this.audioPrivacyType) {
                reject(new Error("Please set the audio privacy type. (Use .setPrivacyType(privacyType: 1 | 2))"));
            }
            const config: AxiosRequestConfig = {
                method: "post",
                url: `https://publish.roblox.com/v1/audio`,
                data: {
                    name: this.name,
                    filePath: fs.readFileSync(this.filePath, { encoding: "base64" }),
                    paymentSource: "User",
                    estimatedFileSize: this.estimatedFileSize,
                    estimatedDuration: this.estimatedAudioDuration,
                    assetPrivacy: this.audioPrivacyType
                }
            };

            axios(config).then(response => {
                resolve(response.data);
            });
        });
    }
}

const Publishing = new BasePublishing();

export default Publishing;

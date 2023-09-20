import { config } from "../client";
import axios, { AxiosRequestConfig } from "axios";
import fs from "node:fs";
import path from "node:path";

export type AssetCreator = {
    userId: number | null;
    groupId: number | null;
};

export type AssetStatus = {
    code: number;
    message: string;
    details: object[];
};

export type AssetOperation = {
    path: string;
    metadata: object;
    done: boolean;
};

type BaseAssetsAPI = {
    CreateAsset(): AssetBuilder;
    UpdateModel(assetId: number, filePath: string): Promise<AssetOperation>;
};

const Assets: BaseAssetsAPI = {
    CreateAsset,
    UpdateModel
};

function CreateAsset (): AssetBuilder {
    return new AssetBuilder();
}

function UpdateModel (assetId: number, filePath: string): Promise<AssetOperation> {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append(
            "request",
            JSON.stringify({
                assetId: assetId
            }),
        );

        const file = fs.readFileSync(path.resolve(__dirname, filePath));

        formData.append("fileContent", file.toString(), filePath);

        const request: AxiosRequestConfig = {
            method: "patch",
            url: `https://apis.roblox.com/assets/v1/assets/${assetId}`,
            data: {
                formData
            },
            headers: {
                "x-api-key": config.Assets
            }
        };

        axios(request)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response.data);
            });
    });
}

class AssetBuilder {
    private baseUrl = "https://apis.roblox.com/assets/";
    private assetType: string;
    private name: string;
    private description: string;
    private creatorId: number;
    private creatorType: string;
    private filePath: string;
    private apiKey: string = config.Assets;

    constructor () {
        this.create();
    }

    setAssetType (assetType: "Model" | "Decal" | "Audio") {
        this.assetType = assetType;
        return this;
    }

    setName (name: string) {
        this.name = name;
        return this;
    }

    setCreatorType (creatorType: "User" | "Group") {
        this.creatorType = creatorType;
        return this;
    }

    setCreatorId (creatorId: number) {
        if (!this.creatorType) {
            return new Error("Make sure you set the Creator Type first before setting the Creator Id");
        } else {
            this.creatorId = creatorId;
            return this;
        }
    }

    setDescription (description: string) {
        this.description = description;
        return this;
    }

    setFilePath (filePath: string) {
        this.filePath = filePath;
        return this;
    }

    create (): Promise<AssetOperation> {
        return new Promise((resolve, reject) => {
            const modelFormData = new FormData();
            let creatorIdType: string;

            if (this.creatorType === "User") {
                creatorIdType = "userId";
            } else if (this.creatorType === "Group") {
                creatorIdType = "groupId";
            }

            const creationContext = {
                creator: {
                    creatorIdType
                }
            };

            modelFormData.append(
                "request",
                JSON.stringify({
                    assetType: this.assetType,
                    creationContext: {
                        creationContext
                    },
                    description: this.description,
                    displayName: this.name
                }),
            );

            const file = fs.readFileSync(path.resolve(__dirname, this.filePath));

            modelFormData.append("fileContent", file.toString(), this.filePath);
            const request: AxiosRequestConfig = {
                method: "post",
                url: `${this.baseUrl}v1/assets`,
                data: {
                    modelFormData
                },
                headers: {
                    "x-api-key": this.apiKey
                }
            };

            axios(request)
                .then(response => {
                    resolve(response.data.path);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    }
}

export default Assets;

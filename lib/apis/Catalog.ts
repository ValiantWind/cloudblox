import axios from "axios";

export type ProductDetails = {
    id: number;
    type: string;
    isPublicDomain: boolean;
    isForSale: boolean;
    priceInRobux: number;
    premiumPricing: {
        premiumDiscountPercentage: number;
        premiumPriceInRobux: number;
    };
};

export type AssetBundles = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        id: number;
        name: string;
        description: string;
        bundleType: string;
        items: {
            owned: boolean;
            id: number;
            name: string;
            type: string;
        }[];
        creator: {
            id: number;
            name: string;
            type: string;
            hasVerifiedBadge: boolean;
        };
        product: ProductDetails;
    }[];
};

export type BundleDetails = {
    id: number;
    name: string;
    description: string;
    bundleType: string;
    items: {
        owned: boolean;
        id: number;
        name: string;
        type: string;
    }[];
    creator: {
        id: number;
        name: string;
        type: string;
        hasVerifiedBadge: boolean;
    };
    product: ProductDetails;
};

export type MultiBundleDetails = {
    data: {
        id: number;
        name: string;
        description: string;
        bundleType: string;
        items: {
            owned: boolean;
            id: number;
            name: string;
            type: string;
        }[];
        creator: {
            id: number;
            name: string;
            type: string;
            hasVerifiedBadge: boolean;
        };
        product: ProductDetails;
    }[];
};

export type BundleRecommendations = {
    id: number;
    name: string;
    description: string;
    bundleType: string;
    items: {
        owned: boolean;
        id: number;
        name: string;
        type: string;
    }[];
    creator: {
        id: number;
        name: string;
        type: string;
        hasVerifiedBadge: boolean;
    };
    product: ProductDetails;
}[];

export type AppStoreExclusiveBundles = {
    data: ProductDetails[];
};

export type UserAssetFavoriteModel = {
    assetId: number;
    userId: number;
    created: Date;
};

export type AssetToCategory = Record<string, number>;
export type AssetToSubCategory = AssetToCategory;

export type Categories = AssetToCategory;
export type SubCategories = AssetToCategory;

export type UserBundles = BundleDetails;
export type UserBundlesByType = UserBundles;

export type AssetFavoriteCount = number;
export type BundleFavoriteCount = number;

type BaseCatalog = {
    getAssetFavoriteCount(AssetId: number): Promise<AssetFavoriteCount>;
    getBundleFavoriteCount(BundleId: number): Promise<BundleFavoriteCount>;
    getAssetBundles(
        AssetId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<AssetBundles>;
    getBundleDetails(BundleId: number): Promise<BundleDetails>;
    getMultiBundleDetails(BundleIds: number[]): Promise<MultiBundleDetails>;
    getUserBundles(UserId: number): Promise<UserBundles>;
    getUserBundlesByType(
        UserId: number,
        bundleType: "BodyParts" | "AvatarAnimations" | string,
        limit: number,
        cursor: string,
        sortOrder: "Desc" | "Asc",
    ): Promise<UserBundlesByType>;
    getBundleRecommendationsById(BundleId: number): Promise<BundleRecommendations>;
    getAppStoreExclusiveBundles(
        appStoreType: "iOS" | "GooglePlay" | "Xbox" | "Amazon",
    ): Promise<AppStoreExclusiveBundles>;
    getAssetToCategory(): Promise<AssetToCategory>;
    getAssetToSubCategory(): Promise<AssetToSubCategory>;
    getCategories(): Promise<Categories>;
    getSubCategories(): Promise<SubCategories>;
    favoriteAsset(UserId: number, AssetId: number): Promise<void>;
    unfavoriteAsset(UserId: number, AssetId: number): Promise<void>;
    unpackBundle(BundleId: number): Promise<void>;
    favoriteBundle(UserId: number, BundleId: number): Promise<void>;
    unfavoriteBundle(UserId: number, BundleId: number): Promise<void>;
    getUserAssetFavoriteModel(UserId: number, AssetId: number): Promise<UserAssetFavoriteModel>;
    getUserBundleFavoriteModel(UserId: number, BundleId: number): Promise<UserAssetFavoriteModel>;
};

const Catalog: BaseCatalog = {
    getAssetFavoriteCount,
    getBundleFavoriteCount,
    getAssetBundles,
    getBundleDetails,
    getMultiBundleDetails,
    getUserBundles,
    getUserBundlesByType,
    getBundleRecommendationsById,
    getAppStoreExclusiveBundles,
    getAssetToCategory,
    getAssetToSubCategory,
    getCategories,
    getSubCategories,
    favoriteAsset,
    unfavoriteAsset,
    unpackBundle,
    favoriteBundle,
    unfavoriteBundle,
    getUserAssetFavoriteModel,
    getUserBundleFavoriteModel
};

function getAssetFavoriteCount (AssetId: number): Promise<AssetFavoriteCount> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/favorites/assets/${AssetId}/count`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getBundleFavoriteCount (BundleId: number): Promise<BundleFavoriteCount> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/favorites/bundles/${BundleId}/count`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAssetBundles (
    AssetId: number,
    sortOrder?: "Asc" | "Desc",
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
): Promise<AssetBundles> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://catalog.roblox.com/v1/assets/${AssetId}/bundles`,
            params: {
                sortOrder,
                limit,
                cursor
            }
        };

        axios(config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getBundleDetails (BundleId: number): Promise<BundleDetails> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/bundles/${BundleId}/details`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getMultiBundleDetails (BundleIds: number[]): Promise<MultiBundleDetails> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/bundles/details?bundleIds=${BundleIds.join(",")}`)
            .then(response => {
                resolve(response.data.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserBundles (UserId: number): Promise<UserBundles> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/users/${UserId}/bundles`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserBundlesByType (
    UserId: number,
    bundleType: "BodyParts" | "AvatarAnimations" | string,
    limit: number,
    cursor: string,
    sortOrder: "Asc" | "Desc",
): Promise<UserBundlesByType> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://catalog.roblox.com/v1/users/${UserId}/${bundleType}`,
            params: {
                limit,
                cursor,
                sortOrder
            }
        };

        axios(config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getBundleRecommendationsById (BundleId: number): Promise<BundleRecommendations> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/bundles/${BundleId}/recommendations`)
            .then(response => {
                resolve(response.data.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAppStoreExclusiveBundles (
    appStoreType: "iOS" | "GooglePlay" | "Xbox" | "Amazon",
): Promise<AppStoreExclusiveBundles> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/exclusive-items/${appStoreType}/bundles`)
            .then(response => {
                resolve(response.data.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAssetToCategory (): Promise<AssetToCategory> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/asset-to-category`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAssetToSubCategory (): Promise<AssetToSubCategory> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/asset-to-subcategory`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getCategories (): Promise<Categories> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/categories`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getSubCategories (): Promise<SubCategories> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://catalog.roblox.com/v1/subcategories`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function unpackBundle (BundleId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.post(`https://catalog.roblox.com/v1/bundles/${BundleId}/unpack`).catch(error => {
        Promise.reject(error);
    });
}

async function unfavoriteAsset (UserId: number, AssetId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }

    await axios.delete(`https://catalog.roblox.com/v1/favorites/users/${UserId}/assets/${AssetId}/favorite`).catch(error => {
        Promise.reject(error);
    });
}

function getUserAssetFavoriteModel (UserId: number, AssetId: number): Promise<UserAssetFavoriteModel> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }

        axios
            .get(`https://catalog.roblox.com/v1/favorites/users/${UserId}/assets/${AssetId}/favorite`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function favoriteAsset (UserId: number, AssetId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.post(`https://catalog.roblox.com/v1/favorites/users/${UserId}/assets/${AssetId}/favorite`).catch(error => {
        Promise.reject(error);
    });
}

async function favoriteBundle (UserId: number, BundleId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.post(`https://catalog.roblox.com/v1/favorites/users/${UserId}/bundles/${BundleId}/favorite`).catch(error => {
        Promise.reject(error);
    });
}

async function unfavoriteBundle (UserId: number, BundleId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .delete(`https://catalog.roblox.com/v1/favorites/users/${UserId}/bundles/${BundleId}/favorite`)
        .catch(error => {
            Promise.reject(error);
        });
}

function getUserBundleFavoriteModel (UserId: number, BundleId: number): Promise<UserAssetFavoriteModel> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://catalog.roblox.com/v1/favorites/users/${UserId}/bundles/${BundleId}/favorite`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default Catalog;

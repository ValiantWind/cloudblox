import axios from 'axios';

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

export type AppStoreExclusiveBundles = {
  data: ProductDetails[];
};

export type AssetToCategory = Record<string, number>;
export type AssetToSubCategory = AssetToCategory;

export type Categories = AssetToCategory;
export type SubCategories = AssetToCategory;

export type UserBundles = BundleDetails;
export type UserBundlesByType = UserBundles;

type BaseCatalog = {
  GetAssetFavoriteCount(AssetId: number): Promise<number>;
  GetBundleFavoriteCount(BundleId: number): Promise<number>;
  GetAssetBundles(
    AssetId: number,
    sortOrder?: 'Asc' | 'Desc',
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
  ): Promise<AssetBundles>;
  GetBundleDetails(BundleId: number): Promise<BundleDetails>;
  GetMultiBundleDetails(BundleIds: number[]): Promise<MultiBundleDetails>;
  GetUserBundles(UserId: number): Promise<UserBundles>;
  GetUserBundlesByType(
    UserId: number,
    bundleType: 'BodyParts' | 'AvatarAnimations' | string,
  ): Promise<UserBundlesByType>;
  GetBundleRecommendationsByBundleId(BundleId: number): Promise<BundleRecommendations>;
  GetAppStoreExclusiveBundles(
    appStoreType: 'iOS' | 'GooglePlay' | 'Xbox' | 'Amazon',
  ): Promise<AppStoreExclusiveBundles>;
  GetAssetToCategory(): Promise<AssetToCategory>;
  GetAssetToSubCategory(): Promise<AssetToSubCategory>;
  GetCategories(): Promise<Categories>;
  GetSubCategories(): Promise<SubCategories>;
};

const Catalog: BaseCatalog = {
  GetAssetFavoriteCount,
  GetBundleFavoriteCount,
  GetAssetBundles,
  GetBundleDetails,
  GetMultiBundleDetails,
  GetUserBundles,
  GetUserBundlesByType,
  GetBundleRecommendationsByBundleId,
  GetAppStoreExclusiveBundles,
  GetAssetToCategory,
  GetAssetToSubCategory,
  GetCategories,
  GetSubCategories,
};

function GetAssetFavoriteCount(AssetId: number): Promise<number> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/favorites/assets/${AssetId}/count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetBundleFavoriteCount(BundleId: number): Promise<number> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/favorites/bundles/${BundleId}/count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetAssetBundles(
  AssetId: number,
  sortOrder?: 'Asc' | 'Desc',
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
): Promise<AssetBundles> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?sortOrder=${sortOrder}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!sortOrder) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!limit) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (!cursor) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

function GetBundleDetails(BundleId: number): Promise<BundleDetails> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/bundles/${BundleId}/details`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetMultiBundleDetails(BundleIds: number[]): Promise<MultiBundleDetails> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/bundles/details?bundleIds=${BundleIds.join(',')}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetUserBundles(UserId: number): Promise<UserBundles> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/users/${UserId}/bundles`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetUserBundlesByType(
  UserId: number,
  bundleType: 'BodyParts' | 'AvatarAnimations' | string,
): Promise<UserBundlesByType> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/users/${UserId}/${bundleType}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetBundleRecommendationsByBundleId(BundleId: number): Promise<BundleRecommendations> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/assets/${BundleId}/recommendations`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetAppStoreExclusiveBundles(
  appStoreType: 'iOS' | 'GooglePlay' | 'Xbox' | 'Amazon',
): Promise<AppStoreExclusiveBundles> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/exclusive-items/${appStoreType}/bundles`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetAssetToCategory(): Promise<AssetToCategory> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/asset-to-category`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetAssetToSubCategory(): Promise<AssetToSubCategory> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/asset-to-subcategory`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetCategories(): Promise<Categories> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/categories`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function GetSubCategories(): Promise<SubCategories> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/subcategories`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Catalog;

import axios from 'axios';

export type AssetOwners = {
  previousPageCursor: string | null;
  nextPageCursor: string | null;
  data: {
    id: number;
    serialNumber: number;
    owner: {
      id: number;
      type: string;
      name: string;
    };
    created: Date;
    updated: Date;
  }[];
};

export type CanViewInventory = boolean;

export type UserInventoryCategories = {
  categories: {
    name: string;
    displayName: string;
    categoryType: string;
    items: {
      name: string;
      displayName: string;
      filter: string;
      id: number;
      type: string;
      categoryType: string;
    }[];
  }[];
};

export type UserFavoriteCategories = UserInventoryCategories;

type BaseInventory = {
  GetAssetOwners(
    AssetId: number,
    sortOrder?: 'Asc' | 'Desc',
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
  ): Promise<AssetOwners>;
  CanViewInventory(UserId: number): Promise<CanViewInventory>;
  GetUserInventoryCategories(UserId: number): Promise<UserInventoryCategories>;
  GetUserFavoriteCategories(UserId: number): Promise<UserFavoriteCategories>;
};

const Inventory: BaseInventory = {
  GetAssetOwners,
  CanViewInventory,
  GetUserInventoryCategories,
  GetUserFavoriteCategories,
};

function GetAssetOwners(
  AssetId: number,
  sortOrder?: 'Asc' | 'Desc',
  limit?: 10 | 25 | 50 | 100,
  cursor?: string,
): Promise<AssetOwners> {
  return new Promise((resolve, reject) => {
    if (!sortOrder && !limit && !cursor) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !limit) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder && !cursor) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?limit=${limit}&sortOrder=Asc`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit && !cursor) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?sortOrder=${sortOrder}&limit=10`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!sortOrder) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!limit) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?sortOrder=${sortOrder}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else if (!cursor) {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?sortOrder=${sortOrder}&limit=${limit}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    } else {
      axios
        .get(`https://catalog.roblox.com/v1/assets/${AssetId}?sortOrder=${sortOrder}&limit=${limit}&cursor=${cursor}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    }
  });
}

function CanViewInventory(UserId: number): Promise<CanViewInventory> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://inventory.roblox.com/v1/users/${UserId}/can-view-inventory`)
      .then((response) => {
        resolve(response.data.canView);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetUserInventoryCategories(UserId: number): Promise<UserInventoryCategories> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://inventory.roblox.com/v1/users/${UserId}/categories`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function GetUserFavoriteCategories(UserId: number): Promise<UserFavoriteCategories> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://inventory.roblox.com/v1/users/${UserId}/categories/favorites`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Inventory;

import axios from "axios";

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
    getAssetOwners(
        AssetId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<AssetOwners>;
    canViewInventory(UserId: number): Promise<CanViewInventory>;
    getUserInventoryCategories(UserId: number): Promise<UserInventoryCategories>;
    getUserFavoriteCategories(UserId: number): Promise<UserFavoriteCategories>;
};

const Inventory: BaseInventory = {
    getAssetOwners,
    canViewInventory,
    getUserInventoryCategories,
    getUserFavoriteCategories
};

function getAssetOwners (
    AssetId: number,
    sortOrder?: "Asc" | "Desc",
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
): Promise<AssetOwners> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://inventory.roblox.com/v2/assets/${AssetId}/owners`,
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

function canViewInventory (UserId: number): Promise<CanViewInventory> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://inventory.roblox.com/v1/users/${UserId}/can-view-inventory`)
            .then(response => {
                resolve(response.data.canView);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserInventoryCategories (UserId: number): Promise<UserInventoryCategories> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://inventory.roblox.com/v1/users/${UserId}/categories`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserFavoriteCategories (UserId: number): Promise<UserFavoriteCategories> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://inventory.roblox.com/v1/users/${UserId}/categories/favorites`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default Inventory;

import Client from "../client";
import Base from "./Base";

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

class BaseInventory extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://inventory.roblox.com/",
            client
        });
    }

    getAssetOwners (
        assetId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<AssetOwners> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v2/assets/${assetId}/owners`,
                authRequired: false,
                params: {
                    sortOrder,
                    limit,
                    cursor
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

    canViewInventory (userId: number): Promise<CanViewInventory> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/can-view-inventory`,
                authRequired: false
            })
                .then(response => {
                    resolve(response.data.canView);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getUserInventoryCategories (userId: number): Promise<UserInventoryCategories> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/categories`,
                authRequired: false
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getUserFavoriteCategories (userId: number): Promise<UserFavoriteCategories> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/categories/favorites`,
                authRequired: false
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

const Inventory = new BaseInventory();

export default Inventory;

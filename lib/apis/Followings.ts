import Base from "./Base";
import Client from "../client";

export type UserFollowingsForGame = {
    universeId: number;
    userId: number;
}

export type UserFollowingGameStatus = {
    UniverseId: number;
    UserId: number;
    CanFollow: boolean;
    IsFollowing: boolean;
    FollowingCountByType: number;
    FollowingLimitByType: number;
}

export type UnfollowedGame = UserFollowingsForGame;
export type FollowedGame = UserFollowingsForGame


class BaseFollowings extends Base {
    constructor (client?: Client) {
        super({
            baseUrl: "https://followings.roblox.com/",
            client
        });
    }


    getUserGameFollowings (userId: number): Promise<UserFollowingsForGame[]> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/universes`,
                requiresAuth: true
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    getUserFollowingGameStatus (userId: number, universeId: number): Promise<UserFollowingGameStatus> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "get",
                path: `v1/users/${userId}/universes/${universeId}/status`,
                requiresAuth: true
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    removeUserGameFollowing (userId: number, universeId: number): Promise<UnfollowedGame> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "delete",
                path: `v1/users/${userId}/universes/${universeId}`,
                requiresAuth: true
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    createUserGameFollowing (userId: number, universeId: number): Promise<FollowedGame> {
        return new Promise((resolve, reject) => {
            this.request({
                method: "post",
                path: `v1/users/${userId}/universes/${universeId}`,
                requiresAuth: true
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }
}

const Followings = new BaseFollowings();

export default Followings;

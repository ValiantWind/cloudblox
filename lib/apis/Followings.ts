import request from "../request"

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

type BaseFollowings = {
	getUserGameFollowings(userId: number): Promise<UserFollowingsForGame[]>
	getUserFollowingGameStatus(userId: number, universeId: number): Promise<UserFollowingGameStatus>
	removeUserGameFollowing(userId: number, universeId: number): Promise<UnfollowedGame>
	createUserGameFollowing(userId: number, universeId: number): Promise<FollowedGame>
}

const Followings : BaseFollowings = {
	getUserGameFollowings,
	getUserFollowingGameStatus,
	removeUserGameFollowing,
	createUserGameFollowing
}

function getUserGameFollowings(userId: number): Promise<UserFollowingsForGame[]> {
	return new Promise((resolve, reject) => {
		request({
			method: 'get',
			url: `https://followings.roblox.com/v1/users/${userId}/universes`,
			requiresAuth: true
		}).then(response => {
			resolve(response.data)
		}).catch(error => {
			reject(error)
		})
	})
}

function getUserFollowingGameStatus(userId: number, universeId: number): Promise<UserFollowingGameStatus> {
	return new Promise((resolve, reject) => {
		request({
			method: 'get',
			url: `https://followings.roblox.com/v1/users/${userId}/universes`,
			requiresAuth: true
		}).then(response => {
			resolve(response.data)
		}).catch(error => {
			reject(error)
		})
	})
}

function removeUserGameFollowing(userId: number, universeId: number): Promise<UnfollowedGame> {
	return new Promise((resolve, reject) => {
		request({
			method: 'delete',
			url: `https://followings.roblox.com/v1/users/${userId}/universes/${universeId}`,
			requiresAuth: true
		}).then(response => {
			resolve(response.data)
		}).catch(error => {
			reject(error)
		})
	})
}

function createUserGameFollowing(userId: number, universeId: number): Promise<FollowedGame> {
	return new Promise((resolve, reject) => {
		request({
			method: 'post',
			url: `https://followings.roblox.com/v1/users/${userId}/universes/${universeId}`,
			requiresAuth: true
		}).then(response => {
			resolve(response.data)
		}).catch(error => {
			reject(error)
		})
	})
}

export default Followings;
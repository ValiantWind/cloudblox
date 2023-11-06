import { config } from "../client";
import axios, { AxiosRequestConfig } from "axios";

export type GroupShoutInfo = {
	created: Date;
	updated: Date;
	content: string;
	posterId?: number;
}

export type GroupRoles = {
	path: string;
	createTime: Date;
	updateTime: Date;
	id: number;
	displayName: string;
	description: string;
	rank: number;
	memberCount: number;
	permissions: {
		viewWallPosts: boolean;
		createWallPosts: boolean;
		deleteWallPosts: boolean;
		viewGroupShout: boolean;
		createGroupShout: boolean;
		changeRank: boolean;
		acceptRequests: boolean;
		exileMembers: boolean;
		manageRelationships: boolean;
		viewAuditLog: boolean;
		spendGroupFunds: boolean;
		advertiseGroup: boolean;
		createAvatarItems: boolean;
		manageAvatarItems: boolean;
		manageGroupUniverses: boolean;
		viewUniverseAnalytics: boolean;
		createApiKeys: boolean;
		manageApiKeys: boolean;
	}
}

export type GroupMembers = {
	path: string;
	createTime: string;
	updateTime: string;
	userId: number;
	roleRank: number;
}

type BaseGroupsAPI = {
	GetGroup(groupId: number | string): Group
}

const Groups: BaseGroupsAPI = {
	GetGroup
} 

function GetGroup(groupId: number | string): Group {
	let url;
	let groupName: string;
	let ownerId: number;
	let description: string;
	let memberCount: number;
	let publicEntryAllowed: boolean;
	let isLocked: boolean;
	let isVerified: boolean;
	let created: Date;
	let lastUpdated: Date;

	if(groupId === typeof("string")){
		url = `https://apis.roblox.com/cloud/v2/groups/${groupId}`
	} else if(groupId === typeof("number")) {
		url = `https://apis.roblox.com/cloud/v2/groups/${groupId.toString()}`
	}
	const requestConfig: AxiosRequestConfig = {
		url,
		method: 'get',
		headers: {
			"x-api-key": config.Groups
		}
	}
	try {
	axios(requestConfig)
	.then(response => {
		groupName = response.data.displayName;
		ownerId = Number((response.data.owner).substring(6));
		description = response.data.description;
		memberCount = response.data.memberCount;
		publicEntryAllowed = response.data.publicEntryAllowed;
		isLocked = response.data.locked;
		isVerified = response.data.verified;
		created = response.data.createTime;
		lastUpdated = response.data.updatedTime;
	})
	} catch(e) {
		return e;
	}
	return new Group(groupId, groupName, ownerId, description, memberCount, publicEntryAllowed, isLocked, isVerified, created, lastUpdated);
}

class Group {
	private readonly baseUrl: string = "https://apis.roblox.com/cloud/v2/groups";
	private apiKey: string = config.Groups;
	groupId: number | string;
	groupName: string;
	ownerId: number;
	description: string;
	memberCount: number;
	publicEntryAllowed: boolean;
	isLocked: boolean;
	isVerified: boolean;
	created: Date;
	lastUpdated: Date;
	
	constructor(groupId: number | string, groupName: string, ownerId: number, description: string, memberCount: number, publicEntryAllowed: boolean, isLocked: boolean, isVerified: boolean, created: Date, lastUpdated: Date){
		this.groupId = groupId;
		this.groupName = groupName;
		this.ownerId = ownerId;
		this.description = description;
		this.memberCount = memberCount;
		this.publicEntryAllowed = publicEntryAllowed;
		this.isLocked = isLocked;
		this.isVerified = isVerified;
		this.created = created;
		this.lastUpdated = lastUpdated;
	}

	GetShoutInfo(): Promise<GroupShoutInfo> {
		return new Promise((resolve, reject) => {
			const requestConfig : AxiosRequestConfig = {
				url: `${this.baseUrl}/${this.groupId}/shout`,
				method: 'get',
				headers: {
					"x-api-key": this.apiKey
				}
			}

			axios(requestConfig)
			.then(response => {
				const data = response.data;

				const info = {
					created: data.createTime,
					updated: data.updateTime,
					content: data.content,
					posterId: Number((data.poster).substring(6))
				}

				resolve(info)
			}).catch(error => {
				reject(error)
			})
		})
	}

	ListGroupRoles(maxPageSize: number): Promise<GroupRoles[]> {
		return new Promise((resolve, reject) => {
			const requestConfig : AxiosRequestConfig = {
				url: `${this.baseUrl}/${this.groupId}/roles`,
				method: 'get',
				headers: {
					"x-api-key": this.apiKey
				},
				params: {
					maxPageSize
				}
			}

			axios(requestConfig)
			.then(response => {
				const data = response.data.groupRoles;

				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	}

	// ListGroupMembers(maxPageSize: number): Promise<GroupMembers[]> {
	// 	return new Promise((resolve, reject) => {
	// 		const requestConfig : AxiosRequestConfig = {
	// 			url: `${this.baseUrl}/${this.groupId}/memberships`,
	// 			method: 'get',
	// 			headers: {
	// 				"x-api-key": this.apiKey
	// 			},
	// 			params: {
	// 				maxPageSize
	// 			}
	// 		}

	// 		axios(requestConfig)
	// 		.then(response => {
	// 			const data = response.data.groupMemberships;

	// 			const groupMembers = {
	// 				path: data.path,
	// 				createTime: data.createTime,
	// 				updateTime: data.updateTime,
	// 				userId: Number((data.user).substring(6)),
	// 				roleRank: Number((data.role).substring(15))
	// 			}
	// 			resolve(groupMembers)
	// 		}).catch(error => {
	// 			reject(error)
	// 		})
	// 	})
	// }
	
}
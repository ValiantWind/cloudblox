import axios from "axios";
import EventEmitter from "events";
import { Games, Avatar, Badges, Catalog, Develop, Groups, Thumbnails, Users } from "../dist/index";

import request from "../lib/request";

// const universeId = 3234769652;
// const universeIdArr = [3234769652];
// const userId = 187808735;
// const userIdArr = [187808735];
// const groupId = 13622916;
// const groupIdArr = [13622916];
// const bundleId = 43
// const bundleIdArr = [43];

// type UserInfo = ReturnType<(userId: number) => {
// 	description: string;
// 	created: Date;
// 	isBanned: boolean;
// 	externalAppDisplayName: string;
// 	hasVerifiedBadge: boolean;
// 	id: number;
// 	name: string;
// 	displayName: string;
// }>



async function test() {
	const universeId = await Develop.getUniverseIdFromPlace(606849621)

	console.log(universeId)

}

test()
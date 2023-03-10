import axios from "axios";
import { Games, Avatar, Badges, Catalog, Develop, Groups, Thumbnails, Users, Auth } from "../dist/index";

import request from "../lib/request";

const universeId = 3234769652;
const universeIdArr = [3234769652];
const userId = 187808735;
const userIdArr = [187808735];
const groupId = 13622916;
const groupIdArr = [13622916];
const bundleId = 43
const bundleIdArr = [43];

async function test(){
	const info = await Auth.getAuthMetaData()
	console.log(info)
}

test()
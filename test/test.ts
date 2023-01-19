import axios from "axios";

import { Badges, Users, Groups } from "../dist/index";



async function test(){
	const badgeInfo = await Badges.GetBadgeInfo(2125655408)
	console.log(badgeInfo)
}
test()

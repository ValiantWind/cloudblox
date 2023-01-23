import axios from "axios";

import { Badges, Avatar, Users, Catalog, Develop } from "../dist/index";

const userid = 187808735

async function test(){
	const response = await Avatar.GetMetaData()
	console.log(response)
}

test()
import axios from "axios";

import { Badges, Avatar, Users, Catalog, Develop, Client, MessagingService } from "../dist/index";


const client = new Client()

// client.Configure({
// 	UniverseId: 3234769652,
// 	MessagingService: ""
// })

function GetIdFromUsername(Username: string): Promise<number> {
	return new Promise((resolve, reject) => {
		axios.post(`https://users.roblox.com/v1/usernames/users`, {
			usernames: [
				Username
			],
			excludeBannedUsers: false
		}).then((response) => {
			resolve(response.data.data[0].id)
		}).catch((error) => {
			reject(new Error(error))
		})
	})
}


async function test(){
	const id = await GetIdFromUsername("ValiantWind")
	console.log(id)
}

test()
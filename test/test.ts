import { Client } from "../lib/index";
import axios from "axios";

const client = new Client();

client.Configure({
	UniverseId: 1,
	MessagingService: "lol"
})


function getUniverseIdFromPlaceId(placeId: number){
		return new Promise((resolve, reject) => {
	axios.get(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`).then(response => {
		resolve(console.log(response));
		})
	})
}

getUniverseIdFromPlaceId(8463806453);
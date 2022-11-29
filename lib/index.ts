import MessagingService from "./OpenCloud/MessagingService";
import Assets from "./OpenCloud/Assets";
import axios from "axios";

interface ConfigKeys {
	UniverseId: number;
	MessagingService: string;
}

export let Config = {
	UniverseId: 0,
	MessagingService: ""
}

export class Client {
	UniverseId: number;
	MessagingService: string;

	Configure(config: ConfigKeys): void {
		this.UniverseId = config.UniverseId;
		this.MessagingService = config.MessagingService;
	}

	getUniverseId(): Promise<number> {
			if(this.UniverseId != undefined) {
				return Promise.resolve(this.UniverseId);
			} else {
				return Promise.reject(new Error("UniverseId not set"));
			}
		}
	
	// getUniverseIdFromPlaceId(placeId: number){
	// 	return new Promise((resolve, reject) => {
	// axios.get(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`).then(response => {
		
	// 	},
	// 	}),
	// }
}



export default { MessagingService, Assets, Config };
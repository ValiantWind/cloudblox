import axios from 'axios';

export default class Client {
  UniverseId: number = global.UniverseId;
  MessagingService: string = global.MessagingService;
  AssetsAPI: string = global.AssetsAPI;
  PlacePublishing: string = global.PlacePublishing;
	Cookie: string = global.Cookie;

	Configure({UniverseId, MessagingService, AssetsAPI, PlacePublishing, Cookie} : {UniverseId?: number, MessagingService?: string, AssetsAPI?: string, PlacePublishing?: string, Cookie?: string} = {}){
		this.UniverseId = UniverseId;
		this.MessagingService = MessagingService;
		this.AssetsAPI = AssetsAPI;
		this.PlacePublishing = PlacePublishing;
		this.Cookie = Cookie;
	}
  getUniverseIdFromPlaceId(placeId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`)
        .then((response) => {
          resolve(response.data.universeId);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getIdFromUsername(username: string): Promise<number> {
    return new Promise((resolve, reject) => {
      axios
        .post(`https://users.roblox.com/v1/usernames/users`, {
          usernames: [username],
          excludeBannedUsers: true,
        })
        .then((response) => {
          resolve(response.data.data[0].id);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
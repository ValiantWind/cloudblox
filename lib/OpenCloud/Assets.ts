import axios from 'axios';
import { Config } from "../index";

const URL = 'https://apis.roblox.com/messaging-service/v1/universes/'

let Assets : any = {}

Assets.GetAssetInfo = function(topic : string, message : string){
		return new Promise((resolve, reject) => {

			if(topic.length > 80){
				reject(new Error("The Topic must be less than 80 characters."))
			}

			if(message.length > 1024){
				reject(new Error("The Topic must be less than 1024 characters."))
			}

			if(typeof topic != "string"){
				reject(new Error("The Topic must be a string."))	
			}
			
			if(typeof message != "string"){
				reject(new Error("The Message must be a string."))
			}

			const UniverseId = Config.UniverseId;

			  axios.post(URL + `${UniverseId}/topics/${topic}`, 
										{ 
											message: message 
										}, 
										{
            					headers: {
												'x-api-key': Config.MessagingService,
										},
        }).then(function(response){

						if(response.status === 200){
							resolve(response.data)
						}
					if(response.status === 400){
						reject(new Error("Invalid request."))
					}
					if(response.status === 401){
						reject(new Error("API key not valid for operation, user does not have authorization."));
					}
					if(response.status === 403){
						reject(new Error("You do not have permission to Publish on this Universe."))
					}
					if(response.status === 405){
						reject(new Error("Internal Server Error/Unknown Error. (Most likely Not An Error On Your End)"));
					}
        }).catch(function(error){
            reject(error)
        })
			
		})
}

export default Assets;
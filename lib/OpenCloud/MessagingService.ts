import axios from 'axios';

const URL = 'https://apis.roblox.com/messaging-service/v1/universes/';

const MessagingService: any = {};

MessagingService.PublishAsync = (topic: string, message: string) => {
  return new Promise((resolve, reject) => {
    const UniverseId = global.UniverseId;

    if (!UniverseId) {
      reject(new Error('UniverseId is not set'));
    }

    if (!global.MessagingService) {
      reject(new Error('No API Key has been set for MessagingService.'));
    }

    axios
      .post(
        URL + `${UniverseId}/topics/${topic}`,
        {
          message,
        },
        {
          headers: {
            'x-api-key': global.MessagingService,
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        if (response.status === 400) {
          reject(new Error('Invalid request.'));
        }
        if (response.status === 401) {
          reject(new Error('API key not valid for operation, user does not have authorization.'));
        }
        if (response.status === 403) {
          reject(new Error('You do not have permission to Publish on this Universe.'));
        }
        if (response.status === 405) {
          reject(new Error('Internal Server Error/Unknown Error.'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default MessagingService;

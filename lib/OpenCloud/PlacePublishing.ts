import axios from 'axios';

const PlacePublishing: any = {};

const URL = `https://apis.roblox.com/universes/`;

PlacePublishing.Save = (UniverseId: number, PlaceId: number) => {
  return new Promise((resolve, reject) => {
    if (!global.PlacePublishing) {
      reject(new Error('No Place Publishing API Key has been set'));
    }
    axios
      .post(URL + `/v1/universe/${UniverseId}/place/${PlaceId}/versions?versionType=Saved`, {
        headers: {
          'x-api-key': global.PlacePublishing,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.versionNumber);
        }
        if (response.status === 400) {
          reject(new Error('Invalid request / Invalid file content.'));
        }
        if (response.status === 401) {
          reject(new Error('API key not valid for operation, user does not have authorization.'));
        }
        if (response.status === 403) {
          reject(new Error('Publish not allowed on place'));
        }
        if (response.status === 404) {
          reject(new Error('Place or universe does not exist.'));
        }
        if (response.status === 409) {
          reject(new Error('Place not part of the universe.'));
        }
        if (response.status === 500) {
          reject(new Error('Server internal error / Unknown error.'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

PlacePublishing.Publish = (UniverseId: number, PlaceId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .post(URL + `/v1/universe/${UniverseId}/place/${PlaceId}/versions?versionType=Published`, {
        headers: {
          'x-api-key': global.PlacePublishing,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.versionNumber);
        }
        if (response.status === 400) {
          reject(new Error('Invalid request / Invalid file content.'));
        }
        if (response.status === 401) {
          reject(new Error('API key not valid for operation, user does not have authorization.'));
        }
        if (response.status === 403) {
          reject(new Error('Publish not allowed on place'));
        }
        if (response.status === 404) {
          reject(new Error('Place or universe does not exist.'));
        }
        if (response.status === 409) {
          reject(new Error('Place not part of the universe.'));
        }
        if (response.status === 500) {
          reject(new Error('Server internal error / Unknown error.'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default PlacePublishing;

import { config } from '../client';

import axios from 'axios';

type BasePlacePublishing = {
  Save(PlaceId: number): Promise<void>;
  Publish(PlaceId: number): Promise<void>;
};

const PlacePublishing: BasePlacePublishing = {
  Save,
  Publish,
};

const URL = `https://apis.roblox.com/universes/`;

async function Save(PlaceId: number): Promise<void> {
  if (!config.PlacePublishing) {
    Promise.reject(new Error('No Place Publishing API Key has been set'));
  }
  if (!config.UniverseId) {
    Promise.reject(new Error(`No UniverseId has been set`));
  }
  axios
    .post(URL + `/v1/universe/${config.UniverseId}/place/${PlaceId}/versions?versionType=Saved`, {
      headers: {
        'x-api-key': config.PlacePublishing,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      Promise.reject(new Error(error));
    });
}

async function Publish(PlaceId: number): Promise<void> {
  if (!config.PlacePublishing) {
    Promise.reject(new Error('No Place Publishing API Key has been set'));
  }
  if (!config.UniverseId) {
    Promise.reject(new Error(`No UniverseId has been set`));
  }
  axios
    .post(URL + `/v1/universe/${config.UniverseId}/place/${PlaceId}/versions?versionType=Published`, {
      headers: {
        'x-api-key': config.PlacePublishing,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      Promise.reject(error);
    });
}

export default PlacePublishing;

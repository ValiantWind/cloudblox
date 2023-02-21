import axios from 'axios';
import { config } from '../client';

export type DataStores = {
  datastores: {
    name: string;
    createdTime: Date;
  }[];
  nextPageCursor: string;
};

type BaseDataStoreService = {
  ListDataStores(UniverseID: number, cursor?: string, limit?: number, prefix?: string): Promise<DataStores>;
};

const DataStoreService: BaseDataStoreService = {
  ListDataStores,
};

function ListDataStores(UniverseId: number): Promise<DataStores> {
  return new Promise((resolve, reject) => {
    if (!config.UniverseId) {
      reject(new Error('No UniverseId is set.'));
    }

    if (!config.DataStoreService) {
      reject(new Error('No API Key has been set for DataStoreService.'));
    }
    axios
      .get(`https://apis.roblox.com/datastores/v1/universes/${UniverseId}/standard-datastores`, {
        headers: {
          'x-api-key': config.DataStoreService,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default DataStoreService;

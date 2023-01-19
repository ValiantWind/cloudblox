import axios from 'axios';

const Develop: any = {};

Develop.getUniverseInfo = (UniverseId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://develop.roblox.com/v1/universes/${UniverseId}`)
      .then((response) => {
        const id = response.data.id;
        const name = response.data.name;
        const description = response.data.description;
        const isArchived = response.data.isArchived;
        const starterPlaceId = response.data.rootPlaceId;
        const isActive = response.data.isActive;
        const privacyType = response.data.privacyType;
        const creatorType = response.data.creatorType;
        const creatorId = response.data.creatorTargetId;
        const creatorName = response.data.creatorName;
        const createdAt = new Date(response.data.created);
        const lastUpdatedAt = new Date(response.data.updated);

        resolve({
          id,
          name,
          description,
          isArchived,
          starterPlaceId,
          isActive,
          privacyType,
          creatorType,
          creatorId,
          creatorName,
          createdAt,
          lastUpdatedAt,
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

Develop.CanManageAsset = (UserId: number, AssetId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://develop.roblox.com/v1/user/${UserId}/canmanage/${AssetId}`)
      .then((response) => {
        resolve(response.data.CanManage);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

Develop.getUniverseIdFromPlaceId = (PlaceId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://apis.roblox.com/universes/v1/places/${PlaceId}/universe`)
      .then((response) => {
        resolve(response.data.universeId);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default Develop;

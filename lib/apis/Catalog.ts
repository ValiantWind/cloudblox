import axios from 'axios';

const Catalog: any = {};

Catalog.getBundleFavoriteCount = (BundleId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://catalog.roblox.com/v1/favorites/bundles/${BundleId}/count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export default Catalog;

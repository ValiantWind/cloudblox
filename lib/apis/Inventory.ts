import axios from 'axios';

export type CanViewInventory = {
  canView: boolean;
};

type BaseInventory = {
  CanViewInventory(UserId: number): Promise<CanViewInventory>;
};

const Inventory: BaseInventory = {
  CanViewInventory,
};

function CanViewInventory(UserId: number): Promise<CanViewInventory> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://inventory.roblox.com/v1/users/${UserId}/can-view-inventory`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default Inventory;

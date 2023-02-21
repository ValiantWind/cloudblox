import axios from 'axios';

export type RobuxCount = number;

type BaseEconomy = {
  GetClientRobuxCount(): Promise<RobuxCount>;
};

const Economy: BaseEconomy = {
  GetClientRobuxCount,
};

function GetClientRobuxCount(): Promise<RobuxCount> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://economy.roblox.com/v1/user/currency`)
      .then((response) => {
        resolve(response.data.robux);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default Economy;

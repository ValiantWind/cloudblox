import axios from "axios";

export type RobuxCount = number;

type BaseEconomy = {
    getClientRobuxCount(): Promise<RobuxCount>;
};

const Economy: BaseEconomy = {
    getClientRobuxCount
};

function getClientRobuxCount (): Promise<RobuxCount> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }
        axios
            .get(`https://economy.roblox.com/v1/user/currency`)
            .then(response => {
                resolve(response.data.robux);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default Economy;

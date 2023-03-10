import axios from "axios";

export type ClientPinStatus = {
    isEnabled: boolean;
    unlockedUntil: number | null;
};

export type AuthMetaData = {
    cookieLawNoticeTimeout: number;
};

type BaseAuth = {
    getClientPinStatus(): Promise<ClientPinStatus>;
    getAuthMetaData(): Promise<AuthMetaData>;
};

const Auth: BaseAuth = {
    getClientPinStatus,
    getAuthMetaData
};

function getClientPinStatus (): Promise<ClientPinStatus> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://auth.roblox.com/v1/account/pin`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAuthMetaData (): Promise<AuthMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://auth.roblox.com/v1/auth/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function changeClientUsername (): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }

	 axios
        .post(`https://auth.roblox.com/v2/username`)
        .catch(error => {
            Promise.reject(error);
        });
}

export default Auth;

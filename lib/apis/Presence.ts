import axios from "axios";

export type LastOnline = {
    lastOnlineTimestamps: {
        userId: number;
        lastOnline: Date;
    }[];
};

type BasePresence = {
    getLastOnline(UserIds: number[]): Promise<LastOnline>;
    registerClientAppPresence(location: string, PlaceId: number, disconnect: boolean): Promise<void>;
};

const Presence: BasePresence = {
    getLastOnline,
    registerClientAppPresence
};

function getLastOnline (UserIds: number[]): Promise<LastOnline> {
    return new Promise((resolve, reject) => {
        axios
            .post(`https://presence.roblox.com/v1/presence/last-online`, {
                userIds: [UserIds.join(",")]
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function registerClientAppPresence (location: string, PlaceId: number, disconnect: boolean): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://presence.roblox.com/v1/presence/register-app-presence`, {
            location,
            placeId: PlaceId,
            disconnect
        })
        .catch(error => {
            Promise.reject(error);
        });
}

export default Presence;

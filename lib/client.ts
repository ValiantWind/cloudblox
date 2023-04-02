import axios from "axios";

export type ClientUserInfo = {
    id: number;
    name: string;
    displayName: string;
};

export type ClientAgeBracket = {
    ageBracket: number;
};

export type ClientCountryCode = {
    countryCode: string;
};

export type ClientPublicRoles = {
    roles: string[];
};

export type ClientAvatarDetails = {
    scales: {
        height: number;
        width: number;
        head: number;
        depth: number;
        proportion: number;
        bodyType: number;
    };
    playerAvatarType: "R6" | "R15" | string;
    bodyColors: {
        headColorId: number;
        torsoColorId: number;
        rightArmColorId: number;
        leftArmColorId: number;
        rightLegColorId: number;
        leftLegColorId: number;
    };
    assets: {
        id: number;
        name: string;
        assetType: {
            id: number;
            name: string;
        };
        currentVersionId: number;
        meta: {
            order: number;
            puffiness: number;
            version: number;
        };
    }[];
    defaultShirtApplied: boolean;
    defaultPantsApplied: boolean;
    emotes: {
        assetId: number;
        assetName: string;
        position: number;
    }[];
};

interface Config {
    UniverseId?: number;
    MessagingService?: string;
    Assets?: string;
    PlacePublishing?: string;
    DataStoreService?: string;
    OrderedDataStores?: string;
}

export type UserId = number;

const config: Config = {};

export default class Client {
    protected readonly baseUsersUrl?: string = "https://users.roblox.com";
    clientUserId?: number;


    Configure ({
        UniverseId,
        MessagingService,
        Assets,
        PlacePublishing,
        DataStoreService,
        Cookie
    }: {
        UniverseId?: number;
        MessagingService?: string;
        Assets?: string;
        PlacePublishing?: string;
        DataStoreService?: string;
        Cookie?: string;
    } = {}) {
        config.UniverseId = UniverseId;
        config.MessagingService = MessagingService;
        config.Assets = Assets;
        config.PlacePublishing = PlacePublishing;
        config.DataStoreService = DataStoreService;
        axios.defaults.headers.common.Cookie = `.ROBLOSECURITY=${Cookie}`;
    }


    getClientUserId (): Promise<UserId> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.baseUsersUrl}/v1/users/authenticated`, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                })
                .then(response => {
                    resolve(response.data.id);
                    this.clientUserId = response.data.id;
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export { config };

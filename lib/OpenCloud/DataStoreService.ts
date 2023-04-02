import axios from "axios";
import { config } from "../client";
import crypto from "crypto";

interface ListEntryOptions {
    prefix: string;
    limit: number;
    cursor?: string;
    scope?: string;
    allScopes?: boolean;
}

export type DataStores = {
    datastores: {
        name: string;
        createdTime: Date;
    }[];
    nextPageCursor: string;
};

export type DataStoreEntries = {
    keys: {
        key: string;
    }[];
    nextPageCursor: string;
};

type BaseDataStoreService = {
    ListDataStores(UniverseID: number, cursor?: string, limit?: number, prefix?: string): Promise<DataStores>;
    GetDataStore(name: string, universeId: number): DataStore;
};

const DataStoreService: BaseDataStoreService = {
    ListDataStores,
    GetDataStore
};

function ListDataStores (UniverseId: number, prefix: string, limit: number): Promise<DataStores> {
    return new Promise((resolve, reject) => {
        if (!config.DataStoreService) {
            reject(new Error("No API Key has been set for DataStoreService."));
        }
        axios
            .get(`https://apis.roblox.com/datastores/v1/universes/${UniverseId}/standard-datastores`, {
                headers: {
                    "x-api-key": config.DataStoreService,
                    "Content-Type": "application/json"
                },
                params: {
                    prefix,
                    limit
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(new Error(error));
            });
    });
}

function GetDataStore (name: string, universeId: number): DataStore {
    if (!config.DataStoreService) {
        throw new Error("No API Key has been set for DataStoreService.");
    }
    return new DataStore(
        name,
        universeId,
        config.DataStoreService,
        `https://apis.roblox.com/datastores/v1/universes/${universeId}/standard-datastores`,
    );
}

class DataStore {
    public readonly name: string;
    public readonly universeId: number;
    public readonly scope: string;
    private apikey: string;
    private baseUrl: string;

    constructor (name: string, universeId: number, apikey: string, baseUrl: string, scope = "global") {
        this.name = name;
        this.universeId = universeId;
        this.apikey = apikey;
        this.baseUrl = baseUrl;
        this.scope = scope;
    }

    ListEntries (listEntryOptions: ListEntryOptions): Promise<DataStoreEntries> {
        return new Promise((resolve, reject) => {
            const { scope, allScopes, prefix, cursor, limit } = listEntryOptions;

            const requestConfig = {
                method: "get",
                url: `${this.baseUrl}/datastore/entries`,
                params: {
                    dataStoreName: this.name,
                    scope,
                    allScopes,
                    prefix,
                    cursor,
                    limit
                },
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.apikey
                }
            };

            axios(requestConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    GetAsync (entryKey: string): Promise<object> {
        return new Promise((resolve, reject) => {
            const requestConfig = {
                method: "get",
                url: `${this.baseUrl}/datastore/entries/entry`,
                params: {
                    dataStoreName: this.name,
                    entryKey,
                    scope: this.scope
                },
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.apikey
                }
            };

            axios(requestConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    SetAsync (entryKey: string, value: any): Promise<object> {
        return new Promise((resolve, reject) => {
            const requestConfig = {
                method: "post",
                url: `${this.baseUrl}/datastore/entries/entry`,
                params: {
                    dataStoreName: this.name,
                    entryKey,
                    scope: this.scope
                },
                headers: {
                    "x-api-key": this.apikey,
                    "content-md5": crypto.createHash("md5").update(JSON.stringify(value)).digest("base64"),
                    "content-type": "application/json"
                },
                data: {
                    value
                }
            };
            axios(requestConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async RemoveEntry (entryKey: string): Promise<void> {
        const requestConfig = {
            method: "delete",
            url: `${this.baseUrl}/datastore/entries/entry`,
            params: {
                dataStoreName: this.name,
                entryKey,
                scope: this.scope
            },
            headers: {
                "x-api-key": this.apikey
            }
        };
        await axios(requestConfig).catch(error => {
            Promise.reject(error);
        });
    }

    IncrementAsync (entryKey: string, amount: number): Promise<object> {
        return new Promise((resolve, reject) => {
            const requestConfig = {
                method: "post",
                url: `${this.baseUrl}/datastore/entries/entry/increment`,
                params: {
                    dataStoreName: this.name,
                    entryKey,
                    incrementBy: amount,
                    scope: this.scope
                },
                headers: {
                    "x-api-key": this.apikey,
                    "content-length": "0"
                }
            };

            axios(requestConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    GetEntryVersion (entryKey: string, versionId: string): Promise<object> {
        return new Promise((resolve, reject) => {
            const requestConfig = {
                method: "get",
                url: `${this.baseUrl}/datastore/entries/entry/versions/version`,
                params: {
                    dataStoreName: this.name,
                    entryKey,
                    versionId,
                    scope: this.scope
                },
                headers: {
                    "x-api-key": this.apikey,
                    "content-type": "application/json"
                }
            };

            axios(requestConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    ListEntryVersions (
        entryKey: string,
        cursor?: string,
        startTime?: string,
        endTime?: string,
        sortOrder?: string,
        limit?: number,
    ): Promise<object> {
        return new Promise((resolve, reject) => {
            if (!limit) {
                limit = 5;
            }

            const requestConfig = {
                method: "get",
                url: `${this.baseUrl}/datastore/entries/entry/versions`,
                params: {
                    dataStoreName: this.name,
                    entryKey,
                    scope: this.scope,
                    cursor,
                    startTime,
                    endTime,
                    sortOrder,
                    limit
                },
                header: {
                    "x-api-key": this.apikey
                }
            };

            axios(requestConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default DataStoreService;

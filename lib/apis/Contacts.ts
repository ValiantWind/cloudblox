import axios from "axios";

export type ContactsMetaData = {
    multiGetContactsMaxSize: number;
    multiGetContactsCacheTTLinMS: number;
};

export type MultiUserTags = {
    targetUserId: number;
    targetUserTag: string;
}[];

export type PostStatus = {
    status: string;
};

export type UserTag = string;

type BaseContacts = {
    getMetaData(): Promise<ContactsMetaData>;
    getUserTags(UserIds: number[]): Promise<MultiUserTags>;
    setUserTag(UserId: number, tag: string): Promise<UserTag>;
};

const Contacts: BaseContacts = {
    getMetaData,
    getUserTags,
    setUserTag
};

function getMetaData (): Promise<ContactsMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://contacts.roblox.com/v1/contacts/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserTags (UserIds: number[]): Promise<MultiUserTags> {
    return new Promise((resolve, reject) => {
        axios
            .post(`https://contacts.roblox.com/v1/user/get-tags`, {
                targetUserIds: UserIds
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function setUserTag (UserId: number, tag: string): Promise<UserTag> {
    return new Promise((resolve, reject) => {
        axios
            .post(`https://contacts.roblox.com/v1/user/tag`, {
                targetUserId: UserId,
                userTag: tag
            })
            .then(response => {
                resolve(response.data.status);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export default Contacts;

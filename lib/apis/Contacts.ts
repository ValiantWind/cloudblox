import axios from 'axios';

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
  GetMetaData(): Promise<ContactsMetaData>;
  MultiGetUserTags(UserIds: number[]): Promise<MultiUserTags>;
  SetUserTag(UserId: number, tag: string): Promise<UserTag>;
};

const Contacts: BaseContacts = {
  GetMetaData,
  MultiGetUserTags,
  SetUserTag,
};

function GetMetaData(): Promise<ContactsMetaData> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://contacts.roblox.com/v1/contacts/metadata`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function MultiGetUserTags(UserIds: number[]): Promise<MultiUserTags> {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://contacts.roblox.com/v1/user/get-tags`, {
        targetUserIds: UserIds,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

function SetUserTag(UserId: number, tag: string): Promise<UserTag> {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://contacts.roblox.com/v1/user/tag`, {
        targetUserId: UserId,
        userTag: tag,
      })
      .then((response) => {
        resolve(response.data.status);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default Contacts;

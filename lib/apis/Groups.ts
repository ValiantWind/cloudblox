import axios from "axios";

export type MultiGroupInfo = {
    data: {
        id: number;
        name: string;
        description: string;
        owner: {
            id: number;
            type: string;
        };
        created: Date;
        hasVerifiedBadge: boolean;
    }[];
};

export type GroupInfo = {
    id: number;
    name: string;
    description: string;
    owner: {
        hasVerifiedBadge: boolean;
        userId: number;
        username: string;
        displayName: string;
    };
    shout: {
        body: string;
        poster: {
            hasVerifiedBadge: boolean;
            userId: number;
            username: string;
            displayName: string;
        };
        created: Date;
        updated: Date;
    };
    memberCount: number;
    publicEntryAllowed: boolean;
    isVerified: boolean;
    isLocked: boolean | null;
};

export type UserRoleFromGroups = {
    data: {
        group: {
            id: number;
            name: string;
            memberCount: number;
            hasVerifiedBadge: boolean;
        };
        role: {
            id: number;
            name: string;
            rank: number;
        };
    }[];
};

export type GroupNameChangeHistory = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        name: string;
        created: Date;
    }[];
};

export type GroupSocialLinks = {
    data: {
        id: number;
        type: number;
        url: string;
        title: string;
    }[];
};

export type GroupWallPosts = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        id: number;
        poster: {
            user: {
                hasVerifiedBadge: boolean;
                userId: number;
                username: string;
                displayName: string;
            };
            role: {
                id: number;
                name: string;
                description: string;
                rank: number;
                memberCount: number;
            };
            body: string;
            created: Date;
            updated: Date;
        };
    }[];
};

export type GroupSettings = {
    isApprovalRequired: boolean;
    isBuildersClubRequired: boolean;
    areEnemiesAllowed: boolean;
    areGroupFundsVisible: boolean;
    areGroupGamesVisible: boolean;
    isGroupNameChangeEnabled: boolean;
};

export type GroupConfigMetaData = {
    groupConfiguration: {
        nameMaxLength: number;
        descriptionMaxLength: number;
        iconMaxFileSizeMb: number;
        cost: number;
        isUsingTwoStepWebviewComponent: boolean;
    };
    recurringPayoutsConfiguration: {
        maxPayoutPartners: boolean;
    };
    roleConfiguration: {
        nameMaxLength: string;
        descriptionMaxLength: string;
        limit: number;
        cost: number;
        minRank: number;
        maxRank: number;
    };
    groupNameChangeConfiguration: {
        cost: number;
        cooldownInDays: number;
        ownershipCooldownInDays: number;
    };
    isPremiumPayoutsEnabled: boolean;
    isDefaultEmblemPolicyEnabled: boolean;
};

export type GroupMetaData = {
    groupLimit: number;
    currentGroupCount: number;
    groupStatusMaxLength: number;
    groupPostMaxLength: number;
    isGroupWallNotificationsEnabled: boolean;
    groupWallNotificationsSubscribeIntervalInMilliseconds: number;
    areProfileGroupsHidden: boolean;
    isGroupDetailsPolicyEnabled: boolean;
    showPreviousGroupNames: boolean;
};

export type GroupRoles = {
    data: {
        groupId: number;
        id: number;
        name: string;
        description: string;
        rank: number;
        memberCount: number;
    }[];
};

export type UserGroupRoles = {
    data: {
        group: {
            id: number;
            name: string;
            description: string;
            owner: {
                hasVerifiedBadge: boolean;
                userId: number;
                username: string;
                displayName: string;
            };
            shout: {
                body: string;
                poster: {
                    hasVerifiedBadge: boolean;
                    userId: boolean;
                    username: string;
                    displayName: string;
                };
                created: Date;
                updated: Date;
            };
            memberCount: number;
            publicEntryAllowed: boolean;
            isLocked: boolean;
            hasVerifiedBadge: boolean;
        };
        role: {
            id: number;
            name: string;
            description: string;
            rank: number;
            memberCount: number;
        };
        isPrimaryGroup: boolean;
    }[];
};

export type UserPrimaryGroup = {
    group: {
        id: number;
        name: string;
        description: string;
        owner: {
            hasVerifiedBadge: boolean;
            userId: number;
            username: string;
            displayName: string;
        };
        shout: {
            body: string;
            poster: {
                hasVerifiedBadge: boolean;
                userId: number;
                username: string;
                displayName: string;
            };
            created: Date;
            updated: Date;
        };
        memberCount: number;
        publicEntryAllowed: boolean;
        isLocked: boolean;
        hasVerifiedBadge: boolean;
    };
    role: {
        id: number;
        name: string;
        description: string;
        rank: number;
        memberCount: number;
    };
    isPrimaryGroup: boolean;
};

export type GroupSearchMetaData = {
    SuggestedGroupKeywords: string[];
    ShowFriendsGroupsSort: boolean;
};

export type GroupFunds = number;

export type NewGroupDetails = {
    id: number;
    name: string;
    description: string;
    owner: {
        id: number;
        type: number;
        name: string;
    };
    memberCount: number;
    created: Date;
    hasVerifiedBadge: boolean;
};

type BaseGroup = {
    multiGetGroupInfo(GroupIds: number[]): Promise<MultiGroupInfo>;
    getGroupInfo(GroupId: number): Promise<GroupInfo>;
    getGroupNameChangeHistory(
        GroupId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<GroupNameChangeHistory>;
    getUserRoleFromGroups(UserId: number): Promise<UserRoleFromGroups>;
    getSocialLinks(GroupId: number): Promise<GroupSocialLinks>;
    getWallPosts(
        GroupId: number,
        sortOrder?: "Asc" | "Desc",
        limit?: 10 | 25 | 50 | 100,
        cursor?: string,
    ): Promise<GroupWallPosts>;
    deleteWallPost(GroupId: number, PostId: number): Promise<void>;
    deleteUserWallPosts(GroupId: number, UserId: number): Promise<void>;
    getGroupSettings(GroupId: number): Promise<GroupSettings>;
    getConfigMetaData(): Promise<GroupConfigMetaData>;
    getMetaData(): Promise<GroupMetaData>;
    getRolesById(RoleIds: number[]): Promise<GroupRoles>;
    getUserRoles(UserId: number): Promise<UserGroupRoles>;
    getUserPrimaryGroup(UserId: number): Promise<UserPrimaryGroup>;
    setClientPrimaryGroup(GroupId: number): Promise<void>;
    removeClientPrimaryGroup(): Promise<void>;
    changeGroupOwner(GroupId: number, UserId: number): Promise<void>;
    claimGroupOwnership(GroupId: number): Promise<void>;
    getSearchMetaData(): Promise<GroupSearchMetaData>;
    getGroupFunds(GroupId: number): Promise<GroupFunds>;
    createGroup(): GroupBuilder;
};
const Groups: BaseGroup = {
    multiGetGroupInfo,
    getGroupInfo,
    getGroupNameChangeHistory,
    getUserRoleFromGroups,
    getSocialLinks,
    getWallPosts,
    deleteWallPost,
    deleteUserWallPosts,
    getGroupSettings,
    getConfigMetaData,
    getMetaData,
    getRolesById,
    getUserRoles,
    getUserPrimaryGroup,
    setClientPrimaryGroup,
    removeClientPrimaryGroup,
    changeGroupOwner,
    claimGroupOwnership,
    getSearchMetaData,
    getGroupFunds,
    createGroup
};

function multiGetGroupInfo (GroupIds: number[]): Promise<MultiGroupInfo> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://groups.roblox.com/v2/groups?groupIds=${GroupIds.join(",")}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getGroupInfo (GroupId: number): Promise<GroupInfo> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://groups.roblox.com/v1/groups/${GroupId}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getGroupNameChangeHistory (
    GroupId: number,
    sortOrder?: "Asc" | "Desc",
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
): Promise<GroupNameChangeHistory> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://groups.roblox.com/v1/groups/${GroupId}/name-history`,
            params: {
                sortOrder,
                limit,
                cursor
            }
        };

        axios(config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserRoleFromGroups (UserId: number): Promise<UserRoleFromGroups> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://groups.roblox.com/v2/users/${UserId}/groups/roles`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getSocialLinks (GroupId: number): Promise<GroupSocialLinks> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://groups.roblox.com/v1/groups/${GroupId}/social-links`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getWallPosts (
    GroupId: number,
    sortOrder?: "Asc" | "Desc",
    limit?: 10 | 25 | 50 | 100,
    cursor?: string,
): Promise<GroupWallPosts> {
    return new Promise((resolve, reject) => {
        if (!sortOrder) {
            sortOrder = "Asc";
        }
        if (!limit) {
            limit = 10;
        }

        const config = {
            method: "get",
            url: `https://groups.roblox.com/v2/groups/${GroupId}/wall/posts`,
            params: {
                sortOrder,
                limit,
                cursor
            }
        };

        axios(config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function deleteWallPost (GroupId: number, PostId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.delete(`https://groups.roblox.com/v1/groups/${GroupId}/wall/posts/${PostId}`).catch(error => {
        Promise.reject(error);
    });
}

async function deleteUserWallPosts (GroupId: number, UserId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.delete(`https://groups.roblox.com/v1/groups/${GroupId}/wall/users/${UserId}/posts`).catch(error => {
        Promise.reject(error);
    });
}

function getGroupSettings (GroupId: number): Promise<GroupSettings> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject(new Error("No cookie has been set."));
        }
        axios
            .get(`https://groups.roblox.com/v1/groups/${GroupId}/settings`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getConfigMetaData (): Promise<GroupConfigMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://groups.roblox.com/v1/groups/configuration/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getMetaData (): Promise<GroupMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://groups.roblox.com/v1/groups/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getRolesById (RoleIds: number[]): Promise<GroupRoles> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://groups.roblox.com/v1/roles?ids=${RoleIds.join(",")}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserRoles (UserId: number): Promise<UserGroupRoles> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://groups.roblox.com/v1/users/${UserId}/groups/roles`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUserPrimaryGroup (UserId: number): Promise<UserPrimaryGroup> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://groups.roblox.com/v1/users/${UserId}/groups/primary/role`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function setClientPrimaryGroup (GroupId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://groups.roblox.com/v1/user/groups/primary`, {
            data: {
                groupId: GroupId
            }
        })
        .catch(error => {
            Promise.reject(error);
        });
}

async function removeClientPrimaryGroup (): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.delete(`https://groups.roblox.com/v1/user/groups/primary`).catch(error => {
        Promise.reject(error);
    });
}

async function changeGroupOwner (GroupId: number, UserId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios
        .post(`https://groups.roblox.com/v1/groups/${GroupId}/change-owner`, {
            data: {
                userId: UserId
            }
        })
        .catch(error => {
            Promise.reject(error);
        });
}

async function claimGroupOwnership (GroupId: number): Promise<void> {
    if (!axios.defaults.headers.common.Cookie) {
        Promise.reject(new Error("No cookie has been set."));
    }
    await axios.post(`https://groups.roblox.com/v1/groups/${GroupId}/claim-ownership`).catch(error => {
        Promise.reject(error);
    });
}

function getSearchMetaData (): Promise<GroupSearchMetaData> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://groups.roblox.com/v1/groups/search/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getGroupFunds (GroupId: number): Promise<GroupFunds> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://economy.roblox.com/v1/groups/${GroupId}/currency`)
            .then(response => {
                resolve(response.data.robux);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function createGroup (): GroupBuilder {
    return new GroupBuilder();
}

class GroupBuilder {
    public name: string;
    public description: string;
    public isPublic: boolean;
    public files: File;

    constructor () {
        this.create();
    }

    setName (name: string) {
        this.name = name;
        return this;
    }

    setDescription (description: string) {
        this.description = description;
        return this;
    }

    setPublic (isPublic: boolean) {
        this.isPublic = isPublic;
        return this;
    }

    setGroupIcon (file: File) {
        this.files = file;
        return this;
    }

    create (): Promise<NewGroupDetails> {
        return new Promise((resolve, reject) => {
            if (!axios.defaults.headers.common.Cookie) {
                reject(new Error("No cookie has been set."));
            }

            const config = {
                method: "post",
                url: `https://groups.roblox.com/v1/groups/create`,
                params: {
                    name: this.name,
                    description: this.description,
                    publicGroup: this.isPublic,
                    files: this.files
                }
            };

            axios(config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default Groups;

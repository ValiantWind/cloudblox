import axios from "axios";

export type ClientChatSettings = {
    chatEnabled: boolean;
    isActiveChatUser: boolean;
    isConnectTabEnabled: boolean;
};

export type ClientConversations = {
    id: number;
    title: string;
    initiator: {
        type: string;
        targetId: string;
        name: string;
        displayName: string;
        hasVerifiedBadge: boolean;
    };
    hasUnreadMessages: boolean;
    participants: {
        type: string;
        targetId: number;
        name: string;
        displayName: string;
        hasVerifiedBadge: boolean;
    }[];
    conversationType: string;
    conversationTitle: {
        titleForViewer: string;
        isDefaultTitle: boolean;
    };
    lastUpdated: Date;
    conversationUniverse: {
        universeId: number;
        rootPlaceId: number;
    };
};

export type ClientMessages = {
    id: number;
    senderType: string;
    sent: Date;
    read: boolean;
    messageType: string;
    decorators: string[];
    senderTargetId: number;
    content: string;
    link: {
        type: string;
        game: {
            universeId: number;
        };
    };
    eventBased: {
        type: string;
        setConversationUniverse: {
            actorUserId: number;
            universeId: number;
        };
    };
};

export type RolloutSettings = {
    featureName: string;
    isRolloutEnabled: boolean;
};

export type UnreadConversationCount = number;

export type UnreadMessages = {
    conversationId: number;
    chatMessages: {
        id: string;
        senderType: string;
        sent: Date;
        read: boolean;
        messageType: string;
        decorators: string[];
        senderTargetId: number;
        content: string;
        link: {
            type: string;
            game: {
                universeId: number;
            };
        };
        eventBased: {
            type: string;
            setConversationUniverse: {
                actorUserId: number;
                universeId: number;
            };
        };
    }[];
};

export type ChatMetaData = {
    isChatEnabledByPrivacySetting: number;
    languageForPrivacySettingUnavailable: string;
    maxConversationTitleLength: number;
    numberOfMembersForPartyChrome: number;
    partyChromeDisplayTimeStampInterval: number;
    signalRDisconnectionResponseInMilliseconds: number;
    typingInChatFromSenderThrottleMs: number;
    typingInChatForReceiverExpirationMs: number;
    relativeValueToRecordUiPerformance: number;
    isChatDataFromLocalStorageEnabled: boolean;
    chatDataFromLocalStorageExpirationSeconds: number;
    isUsingCacheToLoadFriendsInfoEnabled: boolean;
    cachedDataFromLocalStorageExpirationMS: number;
    senderTypesForUnknownMessageTypeError: string[];
    isInvalidMessageTypeFallbackEnabled: boolean;
    isRespectingMessageTypeEnabled: boolean;
    validMessageTypesWhiteList: string[];
    shouldRespectConversationHasUnreadMessageToMarkAsRead: boolean;
    isAliasChatForClientSideEnabled: boolean;
    isPlayTogetherForGameCardsEnabled: boolean;
    isRoactChatEnabled: boolean;
};

export type LatestMessages = UnreadMessages;

export type ConversationStatus = {
    conversationId: number;
    rejectedParticipants: {
        rejectedReason: string;
        type: string;
        targetId: number;
        name: string;
        displayName: string;
        hasVerifiedBadge: boolean;
    }[];
    resultType: string;
    statusMessage: string;
};

export type ConversationTitleStatus = {
    conversationTitle: string;
    resultType: string;
    title: {
        titleForViewer: string;
        isDefaultTitle: boolean;
    };
    statusMessage: string;
};

export type GameLinkMessageStatus = {
    chatMessageLinkType: string;
    messageId: string;
    sent: Date;
    messageType: string;
    resultType: string;
    statusMessage: string;
};

export type SentMessageStatus = {
    content: string;
    filteredForReceivers: boolean;
    messageId: string;
    sent: Date;
    messageType: string;
    resultType: string;
    statusMessage: string;
};

export type ChatStatusMessage = {
    statusMessage: string;
};

export type ChatResultType = {
    resultType: string;
};

export type ConversationResultStatus = {
    conversationId: number;
    resultType: string;
    statusMessage: string;
};

export type CloudEditConversationDetails = {
    conversation: {
        id: number;
        title: string;
        initator: {
            type: string;
            targetId: number;
            name: string;
            diplayName: string;
            hasVerifiedBadge: boolean;
        };
        hasUnreadMessages: boolean;
        participants: {
            type: string;
            targetId: number;
            name: string;
            displayName: string;
            hasVerifiedBadge: boolean;
        }[];
        conversationType: string;
        conversationTitle: {
            titleForViewer: string;
            isDefaultTitle: boolean;
        };
        lastUpdated: Date;
        conversationUniverse: {
            universeId: number;
            rootPlaceId: number;
        };
    };
    rejectedParticipants: {
        rejectedReason: string;
        type: string;
        targetId: number;
        name: string;
        displayName: string;
        hasVerifiedBadge: boolean;
    }[];
    resultType: string;
    statusMessage: string;
};

export type NewGroupConversationDetails = CloudEditConversationDetails;
export type NewConversationDetails = CloudEditConversationDetails;

type BaseChat = {
    getClientChatSettings(): Promise<ClientChatSettings>;
    getClientConversations(conversationIds: number[]): Promise<ClientConversations[]>;
    getClientMessages(
        conversationId: number,
        pageSize: number,
        exclusiveStartMessageId?: string,
    ): Promise<ClientMessages[]>;
    getRolloutSettings(featureNames: string[]): Promise<RolloutSettings[]>;
    getUnreadConversationCount(): Promise<UnreadConversationCount>;
    getUnreadMessages(conversationId: number, pageSize: number): Promise<UnreadMessages[]>;
    getAllClientConversations(pageNumber: number, pageSize: number): Promise<ClientConversations[]>;
    getMetaData(): Promise<ChatMetaData>;
    getLatestMessages(conversationIds: number[], pageSize: number): Promise<LatestMessages[]>;
    addUsersToConversation(conversationId: number, UserIds: number[]): Promise<ConversationStatus>;
    markConversationAsRead(conversationId: number, endMessageId: string): Promise<ChatResultType>;
    markConversationAsSeen(conversationIds: number[]): Promise<ChatResultType>;
    removeUserFromConversation(conversationId: number, userId: number): Promise<ConversationResultStatus>;
    renameGroupConversation(conversationId: number, newTitle: string): Promise<ConversationTitleStatus>;
    resetConversationUniverse(conversationId: number): Promise<ChatStatusMessage>;
    sendGameLinkMessage(
        universeId: number,
        isExperienceInvite: boolean,
        userId: number,
        placeId: number,
        conversationId: number,
        decorators: string[],
    ): Promise<GameLinkMessageStatus>;
    sendChatMessage(
        message: string,
        isExperienceInvite: boolean,
        userId: number,
        conversationId: number,
        decorators: string[],
    ): Promise<SentMessageStatus>;
    setConversationUniverse(conversationId: number, universeId: number): Promise<ChatStatusMessage>;
    createCloudEditConversation(placeId: number): Promise<CloudEditConversationDetails>;
    createGroupConversation(userIds: number[], title: string): Promise<NewGroupConversationDetails>;
    createConversation(userId: number): Promise<NewConversationDetails>;
    setClientTypingStatus(conversationId: number, typingStatus: boolean): Promise<ChatStatusMessage>;
};

const Chat: BaseChat = {
    getClientChatSettings,
    getClientConversations,
    getClientMessages,
    getRolloutSettings,
    getUnreadConversationCount,
    getUnreadMessages,
    getAllClientConversations,
    getMetaData,
    getLatestMessages,
    addUsersToConversation,
    markConversationAsRead,
    markConversationAsSeen,
    removeUserFromConversation,
    renameGroupConversation,
    resetConversationUniverse,
    sendGameLinkMessage,
    sendChatMessage,
    setConversationUniverse,
    createCloudEditConversation,
    createGroupConversation,
    createConversation,
    setClientTypingStatus
};

function getClientChatSettings (): Promise<ClientChatSettings> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .get(`https://chat.roblox.com/v2/chat-settings`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientConversations (conversationIds: number[]): Promise<ClientConversations[]> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .get(`https://chat.roblox.com/v2/chat-settings?conversationIds=${conversationIds.join(",")}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getClientMessages (
    conversationId: number,
    pageSize: number,
    exclusiveStartMessageId?: string,
): Promise<ClientMessages[]> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        const config = {
            method: "get",
            url: `https://chat.roblox.com/v2/get-messages`,
            params: {
                conversationId,
                pageSize,
                exclusiveStartMessageId
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

function getRolloutSettings (featureNames: string[]): Promise<RolloutSettings[]> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .get(`https://chat.roblox.com/v2/get-rollout-settings?featureNames=${featureNames.join(",")}`)
            .then(response => {
                resolve(response.data.rolloutFeatures);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUnreadConversationCount (): Promise<UnreadConversationCount> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .get(`https://chat.roblox.com/v2/get-unread-conversation-count`)
            .then(response => {
                resolve(response.data.count);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getUnreadMessages (conversationId: number, pageSize: number): Promise<UnreadMessages[]> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        const config = {
            method: "get",
            url: `https://chat.roblox.com/v2/get-unread-messages`,
            params: {
                conversationId,
                pageSize
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

function getAllClientConversations (pageNumber: number, pageSize: number): Promise<ClientConversations[]> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        const config = {
            method: "get",
            url: `https://chat.roblox.com/v2/get-user-conversations`,
            params: {
                pageNumber,
                pageSize
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

function getMetaData (): Promise<ChatMetaData> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .get(`https://chat.roblox.com/v2/metadata`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getLatestMessages (conversationIds: number[], pageSize: number): Promise<LatestMessages[]> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        const config = {
            method: "get",
            url: `https://chat.roblox.com/v2/multi-get-latest-messages`,
            params: {
                conversationIds,
                pageSize
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

function addUsersToConversation (conversationId: number, UserIds: number[]): Promise<ConversationStatus> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/add-to-conversation`, {
                participantUserIds: UserIds,
                conversationId
            })
            .catch(error => {
                reject(Error);
            });
    });
}

function markConversationAsRead (conversationId: number, endMessageId: string): Promise<ChatResultType> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/mark-as-read`, {
                conversationId,
                endMessageId
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function markConversationAsSeen (conversationIds: number[]): Promise<ChatResultType> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            Promise.reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/mark-as-read`, {
                conversationsToMarkAsSeen: conversationIds
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function removeUserFromConversation (conversationId: number, userId: number): Promise<ConversationResultStatus> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            Promise.reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/remove-from-conversation`, {
                participantUserId: userId,
                conversationId
            })
            .catch(error => {
                Promise.reject(error);
            });
    });
}

function renameGroupConversation (conversationId: number, newTitle: string): Promise<ConversationTitleStatus> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/rename-group-conversation`, {
                conversationId,
                newTitle
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function resetConversationUniverse (conversationId: number): Promise<ChatStatusMessage> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            Promise.reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/reset-conversation-universe`, {
                conversationId
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function sendGameLinkMessage (
    universeId: number,
    isExperienceInvite: boolean,
    userId: number,
    placeId: number,
    conversationId: number,
    decorators: string[],
): Promise<GameLinkMessageStatus> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/send-game-link-message`, {
                universeId,
                isExperienceInvite,
                userId,
                placeId,
                conversationId,
                decorators
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function sendChatMessage (
    message: string,
    isExperienceInvite: boolean,
    userId: number,
    conversationId: number,
    decorators: string[],
): Promise<SentMessageStatus> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/send-message`, {
                message,
                isExperienceInvite,
                userId,
                conversationId,
                decorators
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function setConversationUniverse (conversationId: number, universeId: number): Promise<ChatStatusMessage> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/set-conversation-universe`, {
                conversationId,
                universeId
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function createCloudEditConversation (placeId: number): Promise<CloudEditConversationDetails> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/start-cloud-edit-conversation`, {
                placeId
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function createGroupConversation (userIds: number[], title: string): Promise<NewGroupConversationDetails> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/start-group-conversation`, {
                participantUserIds: userIds,
                title
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function createConversation (userId: number): Promise<NewConversationDetails> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/start-one-to-one-conversation`, {
                participantUserId: userId
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function setClientTypingStatus (conversationId: number, typingStatus: boolean): Promise<ChatStatusMessage> {
    return new Promise((resolve, reject) => {
        if (!axios.defaults.headers.common.Cookie) {
            reject("No cookie has been set.");
        }

        axios
            .post(`https://chat.roblox.com/v2/update-user-typing-status`, {
                conversationId,
                isTyping: typingStatus
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
export default Chat;

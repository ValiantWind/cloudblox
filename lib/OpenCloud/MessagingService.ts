import axios from 'axios';

import { config } from '../client';

type BaseMessagingService = {
  PublishAsync(topic: string, message: string): void;
};

const MessagingService: BaseMessagingService = {
  PublishAsync,
};

async function PublishAsync(topic: string, message: string): Promise<void> {
  const UniverseId = config.UniverseId;
  const MSApiKey = config.MessagingService;

  if (!UniverseId) {
    Promise.reject(new Error('UniverseId is not set'));
  }

  if (!MSApiKey) {
    Promise.reject(new Error('No API Key has been set for MessagingService.'));
  }

  axios
    .post(
      `https://apis.roblox.com/messaging-service/v1/universes/${UniverseId}/topics/${topic}`,
      {
        message,
      },
      {
        headers: {
          'x-api-key': MSApiKey,
          'Content-Type': 'application/json',
        },
      },
    )
    .catch((error) => {
      Promise.reject(error);
    });
}

export default MessagingService;

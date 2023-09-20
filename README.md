# Cloudblox

An Promise-Based API Wrapper for Roblox's Web API w/ Open Cloud Support

## Not recommended for productive use yet.
This is a big work in progress. Once it works with every available endpoint, it will be ready for productive use. This should happen soon.

***

To Install:

```
npm install cloudblox
```


**Future** Example use:

```ts
// Common JS
const { Client, Users, MessagingService } = require('cloudblox');

// ES6
import { Client, Users, MessagingService } from "cloudblox";


const client = new Client();
// Configuring the client is only required when you are working with methods that need authentication
client.Configure({
	Cookie: "Cookie goes here",
	MessagingService: "MessagingService API Key goes here"
})

Users.getUserInfo(1)

MessagingService.PublishAsync("topic", "message")

```
# Contributing

Contributing would be extremely appreciated. If you have the time, please consider.

View [CONTRIBUTING.md](https://github.com/ValiantWind/cloudblox/blob/main/CONTRIBUTING.md) on how to properly contribute

# License

This package is licensed under the Mozilla Public License 2.0

## Roblox Name Guidelines

I have been approved by Roblox to use the name "cloudblox".

This package **NOT** is affiliated or endorsed by Roblox Corp.

I have simply been given the rights to use "cloudblox" for this package.

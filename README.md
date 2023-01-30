# Cloudblox

An Promise-Based API Wrapper for Roblox Open Cloud and their other Web APIs.

## Not recommended for productive use yet.
This is a big work in progress. Once it works with every available endpoint, it will be ready for productive use. This should happen soon.

Do **not** use the Open Cloud methods yet. It is not ready. 

***

To Install:

```
npm install cloudblox
```


**Future** Example use:

```ts
// Common JS
const { Client } = require('cloudblox');

// ES6
import { Client } from "cloudblox";


const client = new Client();
// Configuring the client is only required when you are working with 
// Open Cloud or when you need to set a cookie for authentication.
client.Configure({
	Cookie: "Cookie goes here"
})
```

# License

This package is licensed under the Mozilla Public License 2.0

## Roblox Name Guidelines

I have been approved by Roblox to use the name "cloudblox".

This package **NOT** is affiliated or endorsed by Roblox Corp.

I have simply been given the rights to use "cloudblox" for this package.

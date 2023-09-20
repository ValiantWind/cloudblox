# Contributing

Currently accepting contributions to more methods for the existing Web APIs that are supported.

Fork the repository, make the changes for your contribution **on the developer branch** (see contribution format below), and make a pull request **TO THE DEVELOPER BRANCH** when you are finished contributing.

After you finishing writing the method(s) you are adding, run the following commands in shell in this order:

```bash
# This will generate the dist file. If any errors appear in the console after this, please delete the dist file and correct the errors and run the command again until no errors appear.
npm run build
```

```bash
npm run lint
# This will run the linter. Please fix all errors and warnings shown after the linter is ran and then run it again until there are no errors and warnings.
```



## Here's the format you must use for new methods:


Let's say you wanted to add a method for the Avatar Web API

You'd create a method inside the BaseAvatar Class in Avatar.ts

The format you must use for the new method is the following:

If the method does not return void, you would use the following template:

```ts
 methodName(parameters): Promise<RETURN_TYPE_GOES_HERE> {
		return new Promise((resolve, reject) => {
			this.request({
	 			method: "", // [Required] - The Request Method used for the endpoint being used for this Method (ie. GET/POST/PATCH/DELETE etc)
				path: ``, // [Required] - Path for the endpoint url. NOTE: Do not specific the base endpoint for the web api being used. (In this case, do not put https://avatar.roblox.com/. You would only put the rest of the url you would see after the base endpoint)
				authRequired: false, // [Required] - Does this endpoitn require cookie authentication? If so, set this to true. If not, set it to false.
				data: { // [Optional] - If the endpoint needs a request body, you would put all the required values in this object.	
				},
				params: { // [Optional] - Query String Parameters go here.
				}
			}).then(response => {
				resolve(response.data)
			}).catch(error => {
				reject(error)
			})
		})
 
 }
 ```

 If the method returns void:

 ```ts
  async methodName(parameters): Promise<void> {
		await	this.request({
	 			method: "", // [Required] - The Request Method used for the endpoint being used for this Method (ie. GET/POST/PATCH/DELETE etc)
				path: ``, // [Required] - Path for the endpoint url. NOTE: Do not specific the base endpoint for the web api being used. (In this case, do not put https://avatar.roblox.com/. You would only put the rest of the url you would see after the base endpoint)
				authRequired: false, // [Required] - Does this endpoitn require cookie authentication? If so, set this to true. If not, set it to false.
				data: { // [Optional] - If the endpoint needs a request body, you would put all the required values in this object.	
				},
				params: { // [Optional] - Query String Parameters go here.
				}
			}).catch(error => {
				Promise.reject(error)
			})
 
 }
 ```

 ## Things to note: 
 - The method parameters MUST have type definitions.
 - The return type must be a custom type defined at the top of the file. 

Return Type Format:
```ts
export type RETURN_TYPE_NAME = {
	// Response Model defined here
}
```

- This format is shown with the rest of the methods in the package, so if you you don't understand, check the other methods to get some examples on what a method would look like.


## Final Notes
- All Contributions are greatly appreciated. If you make a contribution, it means a lot to me.
- If you have any questions or concerns, send me a friend request on Discord (Username: valiantwind) or PM me on the DevForum (Username: ValiantWind)

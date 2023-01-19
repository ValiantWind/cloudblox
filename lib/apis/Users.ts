import axios from 'axios';

// const Users : any = {};

export type UserInfo = {
	description: string;
	joinDate : Date;
	isBanned: boolean;
	isVerified: boolean;
	username: string;
	displayName: string;
}


export default class Users {

	getUserInfo(UserId : number): Promise<UserInfo> {
		return new Promise((resolve, reject) => {
    axios.get(`https://users.roblox.com/v1/users/${UserId}`)
      .then((response) => {
        // const description: string = response.data.description;
        // const joinDate = new Date(response.data.created);
        // const isBanned: boolean = response.data.isBanned;
        // const isVerified: boolean = response.data.hasVerifiedBadge;
        // const username: string = response.data.name;
        // const displayName: string = response.data.displayName;

	resolve(response.data)
  }).catch((e) => {
			reject(e)
	})
	})
	}
}

// Users.getUserInfo = (UserId: GetUserInfo) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(
//         `https://users.roblox.com/v1/users/${UserId}
// `,
//       )
//       .then((response) => {
//         const description: string = response.data.description;
//         const joinDate = new Date(response.data.created);
//         const isBanned: boolean = response.data.isBanned;
//         const isVerified: boolean = response.data.hasVerifiedBadge;
//         const username: string = response.data.name;
//         const displayName: string = response.data.displayName;

//         resolve({
//           username,
//           displayName,
//           description,
//           joinDate,
//           isVerified,
//           isBanned,
//         });
//       })
//       .catch((error) => {
//         reject(new Error(error));
//       });
//   });
// };

// Users.getPrimaryGroup = (UserId: number) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`https://groups.roblox.com/v1/users/${UserId}/groups/primary/role`)
//       .then((response) => {
//         if (response === null) {
//           resolve('User has no primary group');
//         } else {
//           const group = response.data.group;
//           const id: number = group.id;
//           const name: string = group.name;
//           const description: string = group.description;
//           const owner: string = group.owner.username;
//           const ownerUserId: number = group.owner.userId;
//           const publicEntryAllowed: boolean = group.publicEntryAllowed;
//           const isVerified: boolean = group.hasVerifiedBadge;

//           if (group.shout == null) {
//             resolve({
//               id,
//               name,
//               description,
//               owner,
//               ownerUserId,
//               publicEntryAllowed,
//               isVerified,
//               shout: 'Shout could not be found',
//             });
//           } else {
//             resolve({
//               id,
//               name,
//               description,
//               owner,
//               ownerUserId,
//               publicEntryAllowed,
//               isVerified,
//               shout: group.shout,
//             });
//           }
//         }
//       })
//       .catch((error) => {
//         reject(new Error(error));
//       });
//   });
// };

// Users.getFriendCount = (UserId: number) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`https://friends.roblox.com/v1/users/${UserId}/friends/count`)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(new Error(error));
//       });
//   });
// };

// Users.getFollowerCount = (UserId: number) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`https://friends.roblox.com/v1/users/${UserId}/followers/count`)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(new Error(error));
//       });
//   });
// };

// Users.getFollowingCount = (UserId: number): Promise<number> => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`https://friends.roblox.com/v1/users/${UserId}/followings/count`)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(new Error(error));
//       });
//   });
// };

// Users.getIdFromUsername = (username: string): Promise<number> => {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(`https://users.roblox.com/v1/usernames/users`, {
//         usernames: [username],
//         excludeBannedUsers: true,
//       })
//       .then((response) => {
//         resolve(response.data.data[0].id);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export default Users;

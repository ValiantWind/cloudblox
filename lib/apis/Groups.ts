import axios from 'axios';

const Groups: any = {};

Groups.getGroupInfo = (GroupId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://groups.roblox.com/v1/groups/${GroupId}`)
      .then((response) => {
        const description: string = response.data.description;
        const memberCount: number = response.data.memberCount;
        const publicEntryAllowed: boolean = response.data.publicEntryAllowed;
        const isLocked: boolean = response.data.isLocked;
        const isVerified: boolean = response.data.hasVerifiedBadge;
        const groupName: string = response.data.name;
        const owner: string = response.data.owner.username;
        const shout: string = response.data.shout.body;

        resolve({
          groupName,
          description,
          memberCount,
          publicEntryAllowed,
          isLocked,
          isVerified,
          owner,
          shout,
        });
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export default Groups;

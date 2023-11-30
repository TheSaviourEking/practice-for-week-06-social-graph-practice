// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
      // Your code here
      let user = { id: ++this.currentID, name };
      let userFollows = new Set();
      this.users[user.id] = user;
      this.follows[user.id] = userFollows; 
      return user.id;
  }

  getUser(userID) {
      // Your code here
      return this.users[userID] || null;
  }

  follow(userID1, userID2) {
      // Your code here
      if (this.users[userID1] && this.users[userID2]) {
	  if (!this.follows[userID1].has(userID2)) {
	      this.follows[userID1].add(userID2);
	      return true;
	  }
      }
      return false;
  }

  getFollows(userID) {
      // Your code here
      return this.follows[userID] || null;
  }

  getFollowers(userID) {
      // Your code here
      let followers = new Set();
      for (let key in this.follows) {
	  if (this.follows[key].has(userID))  {
	      followers.add(Number(key));
	  }
      }
      return followers;
  }

  getRecommendedFollows(userID, degrees) {
      // Your code here
      const queue = [ [userID] ]; // '[ userID ]' is a path with userID as starting node;
      const set = new Set();

      const result = [];

      while (queue.length > 0) {
	  const currentPath = queue.shift();
	  const lastNode = currentPath[currentPath.length - 1];

	  if (!set.has(lastNode)) {
	      if ((currentPath.length - 1 > 1) && (currentPath.length - 1 <= degrees + 1)) {
	      result.push(lastNode);
	      }
	      if (currentPath.length - 1 > degrees + 1) {
		  break;
	      }
	      set.add(lastNode);

	      const followers = this.follows[lastNode];
	      followers.forEach(follower => queue.push([...currentPath, follower]));
	  }
      }
      return result;
  }
}

module.exports = SocialNetwork;

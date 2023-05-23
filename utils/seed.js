const connectDB = require("../config/connection");
const { Champion, Thought } = require("../models");
const { championNames, getRandomChampionName  } = require("./data");

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    await Champion.deleteMany({});
    await Thought.deleteMany({});

    const thoughts = [];
    for (let i = 0; i < 20; i++) {
      const text = `${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
      const thought = { text };
      thoughts.push(thought);
    }
    await Thought.collection.insertMany(thoughts);
    const thoughtsFromDb = await Thought.find();
    const thoughtIds = thoughtsFromDb.map((thought) => thought._id);

    const champions = [];
    for (let i = 0; i < championNames.length; i++) {
      const championName = championNames[i];
      const existingChampion = await Champion.findOne({ championName });
      if (existingChampion) {
        console.log(`Skipping duplicate champion: ${championName}`);
        continue;
      }
      const email = `${championName.replace(/\s/g, "").toLowerCase()}${Math.floor(Math.random() * 99)}@gmail.com`;
      const thoughtId = thoughtIds[i];

      const numFriends = Math.floor(Math.random() * 3) + 1;
      const friends = [];

      for (let j = 0; j < numFriends; j++) {
        let randomFriendName;
        do {
          randomFriendName = getRandomChampionName();
        } while (randomFriendName === championName || friends.includes(randomFriendName));

        const friend = await Champion.findOne({ championName: randomFriendName });
        if (friend && !friends.includes(friend.championName)) {
          friends.push(friend._id);
        }
      }

      const champion = new Champion({
        championName,
        email,
        thoughts: [thoughtId],
        friends,
      });
      await champion.save();
      champions.push(champion);
    }

    // Populate the friend names for each champion
    await Champion.populate(champions, { path: "friends", select: "championName" });

    console.table(champions.map(champion => ({
      championName: champion.championName,
      email: champion.email,
      thoughts: champion.thoughts,
      friends: champion.friends.map(friend => friend.championName),
    })));
    console.table(thoughts);
    console.log("Seeding complete! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};



seedDatabase();

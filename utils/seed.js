const connectDB = require("../config/connection");
const { Champion, Thought } = require("../models");
const { getRandomName } = require("./data");

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    await Champion.deleteMany({});
    await Thought.deleteMany({});

    const thoughts = [];

    for (let i = 0; i < 20; i++) {
      const text = `${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
      const thought = { thoughtText: text.substring(0, 280) }; // Limit thoughtText to 280 characters
      thoughts.push(thought);
    }

    await Thought.insertMany(thoughts);

    const thoughtsFromDb = await Thought.find();
    const thoughtIds = thoughtsFromDb.map((thought) => thought._id);

    const champions = [];

    for (let i = 0; i < 20; i++) {
      const name = getRandomName();
      const email = `${name.split(" ")[0]}${Math.floor(Math.random() * 99)}@gmail.com`;
    
      const champion = {
        championName: name, // Add championName property
        email,
        thoughts: [thoughtIds[i]],
      };
    
      const randomFriendCount = Math.floor(Math.random() * 5) + 1;
      const randomFriendIds = thoughtIds.slice(0, randomFriendCount);
    
      champion.friends = randomFriendIds;
    
      champions.push(champion);
    }
    

    await Champion.insertMany(champions);

    console.table(champions);
    console.table(thoughts);
    console.info("Seeding complete! 🌱");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

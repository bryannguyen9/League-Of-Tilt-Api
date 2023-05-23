const connection = require("../config/connection");
const { Champion, Thought } = require("../models");
const { getRandomName } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

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

  for (let i = 0; i < 20; i++) {
    const name = getRandomName();
    const email = `${name.split(" ")[0]}${Math.floor(Math.random() * 99)}@gmail.com`;

    const champion = {
      name,
      email,
      thoughts: [thoughtIds[i]],
    };

    const randomFriendCount = Math.floor(Math.random() * 5) + 1;
    const randomFriendIds = thoughtIds.slice(0, randomFriendCount);

    champion.friends = randomFriendIds;

    champions.push(champion);
  }

  await Champion.create(champions);

  // Log out the seed data to indicate what should appear in the database
  console.table(champions);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});

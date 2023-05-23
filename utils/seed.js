const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomChampionName } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await Thought.deleteMany({});

  const thoughts = [];

  for (let i = 0; i < 20; i++) {
    const text = `${getRandomChampionName()} says: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."`;
    const thought = { text };
    thoughts.push(thought);
  }

  await Thought.collection.insertMany(thoughts);

  const thoughtsFromDb = await Thought.find();
  const thoughtIds = thoughtsFromDb.map((thought) => thought._id);

  const users = [];

  for (let i = 0; i < 20; i++) {
    const name = getRandomChampionName();
    const email = `${name.replace(/[^a-zA-Z]/g, "").toLowerCase()}${Math.floor(
      Math.random() * 99
    )}@gmail.com`;
    const password = `${name.replace(/[^a-zA-Z]/g, "").toLowerCase()}${Math.floor(
      Math.random() * 99
    )}`;

    users.push({
      name,
      email,
      password,
      thoughts: [thoughtIds[i]],
    });
  }

  await User.create(users);

  const usersFromDb = await User.find();
  const userIds = usersFromDb.map((user) => user._id);

  for (let i = 0; i < 20; i++) {
    const randomUserIds = userIds.filter(
      (id) => id.toString() !== userIds[i].toString() && Math.random() > 0.5
    );
    await User.findOneAndUpdate(
      { _id: userIds[i] },
      { $set: { friends: randomUserIds } }
    );
  }

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});

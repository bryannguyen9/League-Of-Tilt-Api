const championNames = [
  "Yasuo",
  "Ahri",
  "Jinx",
  "Lux",
  "Ezreal",
  "Thresh",
  "Zed",
  "Darius",
  "Akali",
  "Lee Sin",
  "Ashe",
  "Miss Fortune",
  "Katarina",
  "Vayne",
  "Morgana",
  "LeBlanc",
  "Garen",
  "Caitlyn",
  "Jhin",
  "Twisted Fate",
];

const getRandomChampionName = () => {
  const randomIndex = Math.floor(Math.random() * championNames.length);
  const randomChampion = championNames.splice(randomIndex, 1)[0];
  return randomChampion;
};

module.exports = { championNames, getRandomChampionName };

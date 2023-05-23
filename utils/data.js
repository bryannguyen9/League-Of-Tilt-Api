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
  
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  const getRandomChampionName = () => getRandomArrItem(championNames);
  
  module.exports = { getRandomChampionName };
  
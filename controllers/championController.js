const { Champion, Thought } = require('./models');

const championController = {
  getAllChampions(req, res) {
    // Implement logic to get all Champions from the database
    // and return the data as JSON response
  },

  getChampionById(req, res) {
    // Implement logic to get a single Champion by ID from the database
    // and return the data as JSON response
  },

  createChampion(req, res) {
    // Implement logic to create a new Champion in the database
    // based on the request body data
  },

  updateChampion(req, res) {
    // Implement logic to update a Champion by ID in the database
    // based on the request body data
  },

  deleteChampion(req, res) {
    // Implement logic to delete a Champion by ID from the database
  },

  addFriend(req, res) {
    // Implement logic to add a friend to a Champion's friend list
    // based on the request parameters (ChampionId, friendId)
  },

  removeFriend(req, res) {
    // Implement logic to remove a friend from a Champion's friend list
    // based on the request parameters (ChampionId, friendId)
  }
};

module.exports = championController;
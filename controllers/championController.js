// championController.js

const { Champion, Thought, Reaction } = require('../models');

const championController = {
  // Get all champions
  getAllChampions: async (req, res) => {
    try {
      const champions = await Champion.find();
      res.json(champions);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get champion by ID
  getChampionById: async (req, res) => {
    try {
      const { championId } = req.params;
      const champion = await Champion.findOne({ _id: championId });
      if (!champion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      res.json(champion);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new champion
  createChampion: async (req, res) => {
    try {
      const champion = await Champion.create(req.body);
      res.status(201).json(champion);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Update champion by ID
  updateChampion: async (req, res) => {
    try {
      const { championId } = req.params;
      const updatedChampion = await Champion.findOneAndUpdate(
        { _id: championId },
        { $set: req.body },
        { new: true }
      );
      if (!updatedChampion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      res.json(updatedChampion);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Delete champion by ID
  deleteChampion: async (req, res) => {
    try {
      const { championId } = req.params;
      const deletedChampion = await Champion.findOneAndDelete({ _id: championId });
      if (!deletedChampion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      // Remove the champion from friends' lists
      await Champion.updateMany({}, { $pull: { friends: championId } });
      // Remove the champion's thoughts and associated reactions
      await Thought.deleteMany({ championName: deletedChampion.championName });
      res.json(deletedChampion);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to a champion's friend list
  addFriend: async (req, res) => {
    try {
      const { championId, friendId } = req.params;
      const champion = await Champion.findOneAndUpdate(
        { _id: championId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      if (!champion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      res.json(champion);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove a friend from a champion's friend list
  removeFriend: async (req, res) => {
    try {
      const { championId, friendId } = req.params;
      const champion = await Champion.findOneAndUpdate(
        { _id: championId },
        { $pull: { friends: friendId } },
        { new: true }
      );
      if (!champion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      res.json(champion);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = championController;

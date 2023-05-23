const { Champion, Thought } = require('./models');

const championController = {
  getAllChampions: async (req, res) => {
    // get all Champions from the database
    try {
      const champions = await Champion.find({})
      .populate('thoughts')
      .populate('friends');
      res.json(champions);
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json(err);
    }
  },

  getChampionById: async (req, res) => {
    // get a single Champion by ID from the database
    try {
      const { id } = req.params;
      const champion = await Champion.findOne({ _id: id })
      .populate('thoughts')
      .populate('friends');
      if(!champion) {
        res.status(404).json({ message: 'No Champion found with this id!' });
        return;
      }
      res.json(champion);
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json(err);
    }
  },

  createChampion: async (req, res) => {
    try {
      const champion = await Champion.create(req.body);
      res.json(champion);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  updateChampion: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedChampion = await Champion.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedChampion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      res.json(champion);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  deleteChampion: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedChampion = await Champion.findOneAndDelete({ _id: id });
      if (!deletedChampion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      await Champion.updateMany(
        { _id: { $in: champion.friends } },
        { $pull: { friends: id } }
      );
      res.json({ message: 'Champion deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

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
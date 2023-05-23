// thoughtController.js

const { Champion, Thought } = require('./models');

const thoughtController = {
  // Create a new thought
  createThought: async (req, res) => {
    try {
      const { championId } = req.params;
      const thought = req.body;
      const newThought = await Thought.create(thought);
      const updatedChampion = await Champion.findOneAndUpdate(
        { _id: championId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      if (!updatedChampion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      res.status(201).json(newThought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Delete a thought by ID
  deleteThought: async (req, res) => {
    try {
      const { championId, thoughtId } = req.params;
      const deletedThought = await Thought.findOneAndDelete({ _id: thoughtId });
      if (!deletedThought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      const updatedChampion = await Champion.findOneAndUpdate(
        { _id: championId },
        { $pull: { thoughts: thoughtId } },
        { new: true }
      );
      if (!updatedChampion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      // Delete reactions associated with the thought
      await Reaction.deleteMany({ _id: { $in: deletedThought.reactions } });
      res.json(deletedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;

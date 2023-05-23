const { Champion, Thought } = require('./models');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const { id } = req.params;
      const thought = await Thought.findOne({ _id: id });
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    try {
      const { championId } = req.params;
      const thought = await Thought.create(req.body);
      const champion = await Champion.findOneAndUpdate(
        { _id: championId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!champion) {
        res.status(404).json({ message: 'No champion found with this id' });
        return;
      }
      res.status(201).json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedThought = await Thought.findOneAndDelete({ _id: id });
      if (!deletedThought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(deletedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  addReaction: async (req, res) => {
    try {
      const { id } = req.params;
      const reaction = req.body;
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: id },
        { $push: { reactions: reaction } },
        { new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  removeReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;

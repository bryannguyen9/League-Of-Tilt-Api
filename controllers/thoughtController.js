// thoughtController.js

const { Champion, Thought, Reaction } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get thought by ID
  getThoughtById: async (req, res) => {
    try {
      const { id } = req.params;
      const thought = await Thought.findById(id);
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

  // Update a thought by ID
  updateThought: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedThought = await Thought.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(updatedThought);
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
      res.json(deletedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;

const { Champion, Thought, Reaction } = require('./models');

const reactionController = {
  createReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const reaction = req.body;
      const newReaction = await Reaction.create(reaction);
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: newReaction._id } },
        { new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.status(201).json(newReaction);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
      const deletedReaction = await Reaction.findOneAndDelete({ _id: reactionId });
      if (!deletedReaction) {
        res.status(404).json({ message: 'No reaction found with this id' });
        return;
      }
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: reactionId } },
        { new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(deletedReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = reactionController;

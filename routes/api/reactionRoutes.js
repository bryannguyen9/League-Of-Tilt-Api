const express = require('express');
const router = express.Router();

const {
  createReaction,
  deleteReaction
} = require('../../controllers/reactionController');

// POST /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// DELETE /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').delete(deleteReaction);

module.exports = router;
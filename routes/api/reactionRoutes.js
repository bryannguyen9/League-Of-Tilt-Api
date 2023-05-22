const express = require('express');
const router = express.Router();

const {
  addReaction,
  deleteReaction
} = require('../controllers/reaction-controller');

// POST /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').delete(deleteReaction);

module.exports = router;
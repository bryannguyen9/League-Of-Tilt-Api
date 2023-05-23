const express = require('express');
const router = express.Router();

const {
  createReaction,
  deleteReaction
} = require('../../controllers/reactionController');

// POST /api/reactions/:thoughtId
router.route('/:thoughtId').post(createReaction);

// DELETE /api/reactions/:thoughtId/:reactionId
router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;

const router = require('express').Router();
const {
  getAllChampions,
  getChampionById,
  createChampion,
  updateChampion,
  deleteChampion,
  addFriend,
  removeFriend
} = require('../../controllers/champion-controller');

// Define routes
router.route('/')
  .get(getAllChampions)
  .post(createChampion);

router.route('/:id')
  .get(getChampionById)
  .put(updateChampion)
  .delete(deleteChampion);

router.route('/:championId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
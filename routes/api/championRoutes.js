const router = require('express').Router();
const {
  getAllChampions,
  getChampionById,
  createChampion,
  updateChampion,
  deleteChampion,
  addFriend,
  removeFriend
} = require('../../controllers/championController');

router.route('/')
  .get(getAllChampions)
  .post(createChampion);

router.route('/:championId')
  .get(getChampionById)
  .put(updateChampion)
  .delete(deleteChampion);

router.route('/:championId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
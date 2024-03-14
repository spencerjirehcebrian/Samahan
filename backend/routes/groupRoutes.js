const express = require(`express`);
const router = express.Router();
const {  getGroup, setGroup, updateGroup, deleteGroup, getGroups, getAllGroups, addGroupMember, removeGroupMember  } = require('../controllers/groupControllers')
const { protect } = require (`../middleware/authMiddleware`)

router.get('/:id', getGroup)

router.get('/user/:id', protect, getGroups)

router.get('/', getAllGroups)

router.post('/', protect, setGroup)

router.put('/:id', protect, updateGroup)

router.put('/add_member/:id', protect, addGroupMember)
router.put('/rem_member/:id', removeGroupMember)

router.delete('/:id', protect, deleteGroup)

module.exports = router;
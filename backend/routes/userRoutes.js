const express = require(`express`)
const router = express.Router()
const { getUser, registerUser, loginUser, getCurrentUser } = require(`../controllers/userController`)
const { protect } = require (`../middleware/authMiddleware`)

router.post('/', registerUser)
router.get('/get/:id', getUser)
router.post('/login', loginUser)
router.get('/current', protect, getCurrentUser)

module.exports = router
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getAllUser,
} = require('../controllers/userController');

// const { giveTask } = require('../controllers/taskController');

const { protect } = require('../midleware/auth');

router.route('/register').post(registerUser);
router.route('/login').get(loginUser);
router.route('/:id').get(getUser);
router.route('/alluser').get(getAllUser);
// router.route('/givetask').post(giveTask);

module.exports = router;

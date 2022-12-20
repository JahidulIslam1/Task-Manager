const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTask,
  createNewTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const { protect } = require('../midleware/auth');

router.route('/').post(protect, createNewTask);
router.route('/').get(protect, getAllTasks);
router.route('/:id').get(protect, getTask);
router.route('/:id').put(protect, updateTask);
router.route('/:id').delete(protect, deleteTask);

module.exports = router;

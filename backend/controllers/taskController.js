const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

//@desc  Create Task
//@route Post /api/tasks
//@access Private

const createNewTask = asyncHandler(async (req, res) => {
  if (!req.body.task_title) {
    res.status(400);
    throw new Error('Please add a Task Title');
  }

  if (!req.body.task_details) {
    res.status(400);
    throw new Error('Please add a Task Details');
  }

  const task = await Task.create({
    task_title: req.body.task_title,
    task_details: req.body.task_details,
    user: req.user.id,
  });

  res.status(201).json({
    message: 'Task Created Successfully',
    task,
  });
});

//@desc  Get all Tasks
//@route Get /api/tasks
//@access Private

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    message: 'All Task List',
    tasks,
  });
});

//@desc  Get Task
//@route Get /api/tasks
//@access Private

const getTask = asyncHandler(async (req, res) => {
  // const tasks = await Task.findById(req.params.id);
  const tasks = await Task.find({ user: req.user.id });

  res.status(200).json({
    message: 'Task Found',
    tasks,
  });
});

//@desc  Update Task
//@route Put /api/tasks/:id
//@access Private

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the tasl user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: 'Task Updated Successfullys',
    updatedTask,
  });
});

//@desc  Delete Task
//@route Get /api/tasks/:id
//@access Private

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await task.remove();

  res.status(200).json({
    message: 'Task Deleted Successfully',
    id: req.params.id,
  });
});

//@desc  Assign Task
//@route Post /api/tasks
//@access Public
// const assignTask = asyncHandler(async (req, res) => {
//   if (!req.body.name) {
//     res.status(400);
//     throw new Error('Please add a task Name');
//   }

//   const giveTask = await User.create({
//     name: req.body.name,
//     user: req.user.id,
//   });

//   res.status(201).json({
//     message: 'Task Assign Successfully',
//     giveTask,
//   });
// });

module.exports = {
  getAllTasks,
  getTask,
  createNewTask,
  updateTask,
  deleteTask,
  // assignTask,
};

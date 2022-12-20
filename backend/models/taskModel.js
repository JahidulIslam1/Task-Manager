const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    task_title: {
      type: String,
      required: [true, 'Please add a task title'],
    },
    task_details: {
      type: String,
      required: [true, 'Please add a task details'],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);

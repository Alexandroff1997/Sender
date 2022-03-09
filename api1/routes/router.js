const { Router } = require('express');
const Task = require('../models/tasks');
const { Redis } = require('../redis');

const router = Router();

router.get('/api', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ result: tasks });
  } catch (err) {
    console.log('error getting tasks', err);
    res.status(500).json({ err });
  }
});

router.post('/api', async (req, res) => {
  const { tasks } = req.body;
  if ((!tasks && !Array.isArray(tasks)) || !tasks.length) {
    return res.status(400).send();
  }
  const result = [];
  for (let task of tasks) {
    const updatedTask = await Task.findByIdAndUpdate(
      task._id,
      { isActive: task.isActive },
      { new: true }
    );
    if (updatedTask) {
      result.push(updatedTask);
    }
  }

  const activeTasks = result.filter((task) => task.isActive);

  if (activeTasks.length) {
    const redisInstance = await Redis.getInstance();
    await redisInstance.sendTasks(activeTasks);
  }

  return res.status(200).json({ result });
});

module.exports = router;

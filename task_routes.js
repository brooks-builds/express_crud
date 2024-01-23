const express = require('express');
const {insertTask, getAllTasks, getTaskById, updateName, markCompletion, deleteTask} = require('./db/task_queries');

const Router = express.Router;
const router = Router();

router.route('/tasks')
  .post(async (req, res) => {
    try {
      const id = await insertTask(req.body);
      res.status(201).json({data: id});
    } catch (error) {
      handleError(error, res);
    }
  })
  .get(async (req, res) => {
    try {
      const tasks = await getAllTasks();

      res.json({tasks});
    } catch (error) {
      handleError(error, res);
    }
  });

router.route('/tasks/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const task = await getTaskById(id);

      res.json({task});
    } catch (error) {
      handleError(error, res);
    }
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    try {
      await updateName(id, name);

      res.sendStatus(204);
    } catch (error) {
      handleError(error, res);
    }
  })
  .delete(async (req, res) => {
    const {id} = req.params;

    try {
      await deleteTask(id);

      res.sendStatus(204);
    } catch (error) {
      handleError(error, res);
    }
  })

router.patch('/tasks/:id/complete', async (req, res) => {
  const {id} = req.params;

  try {
    await markCompletion(id, true);

    res.sendStatus(204);
  } catch (error) {
    handleError(error, res);
  }
});

router.patch('/tasks/:id/uncomplete', async (req, res) => {
  const {id} = req.params;

  try {
    await markCompletion(id, false);

    res.sendStatus(204);
  } catch (error) {
    handleError(error, res);
  }
});

function handleError(error, res) {
  console.error(error);
  res.status(500).json({error: error.message});
}

module.exports = router;

import {Router} from 'express';
import mongoose from "mongoose";
import Task from '../models/Task';
import auth, { RequestWithUser } from '../middleware/auth';

const taskRouter = Router();

taskRouter.post('/', auth, async (req: RequestWithUser, res, next) => {

  try {
    const task = new Task({
      user: req.user?.user,
      title: req.body.title,
      description: req.body.description,
    });

    await task.save();
    return res.send(task);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    next(error);
  }
});

taskRouter.get('/', auth, async (req: RequestWithUser, res, next) => {

  try {
    const task = await Task.find();
    return res.send(task);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    next(error);
  }
});

taskRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {

  try {
    if (!req.params.id) {
      res.status(400).send({"error": "Id params must be in url"});
    }
    await Task.deleteOne({_id: req.params.id});

    return res.send("task was deleted");

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    next(error);
  }

});

taskRouter.put('/:id', auth, async (req: RequestWithUser, res, next) => {

  try {
    if (!req.params.id) {
      res.status(400).send({"error": "Id params must be in url"});
    }
    await Task.updateOne({_id: req.params.id}, req.body);

    return res.send('task updated');

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    next(error);
  }

});


export default taskRouter
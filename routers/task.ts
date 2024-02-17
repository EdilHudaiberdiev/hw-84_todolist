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
  } catch (e) {
    next(e);
  }
});

export default taskRouter
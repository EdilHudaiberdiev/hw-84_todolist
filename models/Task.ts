import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    user: String,
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["new", "in_progress", "complete"],
      default: "new"
    }
  },
  { timestamps: true },
);

const Task = model('Task', TaskSchema);

export default Task;

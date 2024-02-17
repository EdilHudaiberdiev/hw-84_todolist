import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    //   validate: {
    //     validator: async (value: Types.ObjectId) => {
    //       const user = await User.findById(value);
    //       return Boolean(user);
    //     },
    //     message: 'User does not exist!',
    //   },
    // },
    user: String,
    title: String,
    description: String,
  },
  { timestamps: true },
);

const Task = model('Task', TaskSchema);

export default Task;

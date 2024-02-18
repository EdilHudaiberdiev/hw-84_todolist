import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Task from './models/Task';
import crypto from 'crypto';


const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users', 'tasks'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [user1, user2] = await User.create(
    {
      user: 'user1',
      password: 'qwerty1!',
      token: crypto.randomUUID(),
    },
    {
      user: 'user2',
      password: 'qwerty2!',
      token: crypto.randomUUID(),
    },
  );

  await Task.create(
    {
      user: user1._id,
      title: "Simple task for user1",
      description: 'any description, any description, any description',
      status: 'new',
    },
    {
      user: user1._id,
      title: "Extra task for user1",
      description: 'any description, any description, any description',
      status: 'in_progress',
    },
    {
      user: user2._id,
      title: "Simple task for user2",
      description: 'any description, any description, any description',
      status: 'new',
    },
  );

  await db.close();
};

void run();

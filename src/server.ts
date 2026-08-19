import app from './app';
import { PORT } from './config/env';
import { connectDatabase } from './config/database';

async function start() {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();

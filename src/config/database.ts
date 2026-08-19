import mongoose from 'mongoose';
import { MONGODB_URI } from './env';

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
}

export default mongoose;

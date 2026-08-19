import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './modules/auth/auth.routes';
import libraryItemRoutes from './modules/library-items/library-item.routes';
import collectionRoutes from './modules/collections/collection.routes';
import generatorRoutes from './modules/generator/generator.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ success: true, data: { status: 'ok' } }));

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/library-items', libraryItemRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/generator', generatorRoutes);

// Mount feature routers here later

// Error handler (last)
app.use(errorHandler);

export default app;

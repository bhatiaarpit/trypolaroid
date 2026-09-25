import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';
import { supabase } from './lib/supabase';
import multer from 'multer';
import momentsRouter from './routes/moments';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/moments', momentsRouter);

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from the Express backend!',
  });
});

// Database health check
app.get('/api/health/db', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      database: 'connected',
    });
  } catch (error) {
    console.error('Database connection failed:', error);

    res.status(500).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});

app.get('/api/health/storage', async (req, res) => {
  try {
    const testFile = Buffer.from(
      'Polaroid storage connection works!'
    );

    const { error } = await supabase.storage
      .from('polaroid-photos')
      .upload('test/connection.txt', testFile, {
        contentType: 'text/plain',
        upsert: true,
      });

    if (error) {
      throw error;
    }

    res.json({
      status: 'ok',
      storage: 'connected',
      bucket: 'polaroid-photos',
    });
  } catch (error) {
    console.error('Storage connection failed:', error);

    res.status(500).json({
      status: 'error',
      storage: 'disconnected',
    });
  }
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof multer.MulterError) {
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    res.status(status).json({ error: status === 413 ? 'Photo must be 10 MB or smaller.' : 'Invalid photo upload.' });
    return;
  }

  console.error('Unhandled request error:', error instanceof Error ? error.message : 'Unknown error');
  res.status(500).json({ error: 'Unexpected server error.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
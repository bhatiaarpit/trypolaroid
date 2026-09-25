"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./lib/prisma");
const supabase_1 = require("./lib/supabase");
const multer_1 = __importDefault(require("multer"));
const moments_1 = __importDefault(require("./routes/moments"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/moments', moments_1.default);
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
        await prisma_1.prisma.$queryRaw `SELECT 1`;
        res.json({
            status: 'ok',
            database: 'connected',
        });
    }
    catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
        });
    }
});
app.get('/api/health/storage', async (req, res) => {
    try {
        const testFile = Buffer.from('Polaroid storage connection works!');
        const { error } = await supabase_1.supabase.storage
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
    }
    catch (error) {
        console.error('Storage connection failed:', error);
        res.status(500).json({
            status: 'error',
            storage: 'disconnected',
        });
    }
});
app.use((error, _req, res, _next) => {
    if (error instanceof multer_1.default.MulterError) {
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

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration with Debugging
const allowedOrigins = ['http://localhost:5173']; // Allow Vite dev server
app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin checked:', origin); // Debug log
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Routes
app.use('/api/products', productRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong on the server!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Uncaught Exception Handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.stack);
  process.exit(1);
});

// Server Start with Graceful Shutdown
const PORT = process.env.PORT || 5001; // Changed from 5000 to avoid conflict
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
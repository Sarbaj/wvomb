import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import contactRoutes from './routes/contact.js';
import messageRoutes from './routes/messages.js';
import businessRoutes from './routes/business.js';
import articleRoutes from './routes/articles.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: [
  'https://wvomb.vercel.app'      // Production only
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/articles', articleRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'WVOMB Backend API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

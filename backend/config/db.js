import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xyevmbo.mongodb.net/${process.env.DB_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;

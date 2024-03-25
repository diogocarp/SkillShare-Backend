import mongoose from 'mongoose';

import pass from './pass';

const MONGODB_URI = `mongodb+srv://diogocarpinelli:${pass}@cluster0.lhki648.mongodb.net/`;

mongoose.connect(MONGODB_URI, {
  dbName: 'Skillshare'
});

export async function connectDB() {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }


import express from 'express';
import { connectDB } from './config/db';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

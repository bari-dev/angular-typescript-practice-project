import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// basic api path
const path = '/api/v1'

// Routes
app.use(`${path}/auth`, authRoutes);
app.use(`${path}/users`, userRoutes);


// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
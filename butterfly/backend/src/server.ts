import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import subdomainAuthRoutes from './routes/subdomainAuthRoutes';
import userRoutes from './routes/userRoutes';
import tasklistRoutes from './routes/tasklistRoutes';
import forceRoutes from './routes/forceRoutes';
import authenticateUser from './middleware/auth';
import TaskList from './models/tasklist';
import User from './models/user';
import sequelizeConnection from './config/database';
import subdomainAuth from './middleware/subdomainAuthTasklist';
import Task from './models/task';
import TasklistMember from './models/tasklistMembers';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

sequelizeConnection.authenticate().then(() => {
  TaskList.associate();
  User.associate();
  Task.associate();
  TasklistMember.associate();
});

// basic api path
const path = '/api/v1'

// Routes
app.use(`${path}/auth`, authRoutes);
app.use(`${path}/subdomainAuth`, subdomainAuthRoutes);
app.use(`${path}/users`, authenticateUser, userRoutes);
app.use(`${path}/tasklists`, subdomainAuth, tasklistRoutes);
app.use(`${path}/force`, authenticateUser, forceRoutes);

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
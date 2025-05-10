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
import TaskUser from './models/taskuser';
import Notification from './models/notification';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['*'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Sequelize connection and model association
sequelizeConnection.authenticate().then(() => {
  TaskList.associate();
  User.associate();
  Task.associate();
  TasklistMember.associate();
  TaskUser.associate();
});

// Create an HTTP server for both Express and socket.io
const server = http.createServer(app);
export const socketIo = new Server(server, {
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling']
});

socketIo.on('connection', (socket) => {
  const userId = socket.handshake.query?.userId;
  console.log(`User connected with ID: ${userId}`);

  if (!userId) {
    console.error('No userId passed');
    socket.disconnect();
    return;
  }

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${userId}`);
  });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/subdomainAuth', subdomainAuthRoutes);
app.use('/api/v1/users', authenticateUser, userRoutes);
app.use('/api/v1/tasklists', subdomainAuth, tasklistRoutes);
app.use('/api/v1/force', authenticateUser, forceRoutes);

// Start the server (Express + Socket.io)
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

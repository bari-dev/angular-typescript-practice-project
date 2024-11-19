import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../interfaces/user';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    next();
  });
};

export default authenticateToken;
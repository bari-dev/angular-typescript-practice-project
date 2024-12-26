import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import UserInterface from 'interfaces/user';

declare global {
  namespace Express {
    export interface Request {
      user?: UserInterface;
    }
  }
}

const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
      return;
    }

    req.user = decoded as UserInterface;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;

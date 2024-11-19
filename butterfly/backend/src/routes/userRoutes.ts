import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import authenticateToken from '../middleware/auth';
import validateUser from '../middleware/validate';

const router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password }: { username: string; email: string; password: string } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) { res.status(400).send('User already exists'); }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });
  
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.json({ token });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).send('User not found');
    }else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).send('Invalid password');
      }else {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
      }
    }
  } catch (error) {
    next(error);
  }
});

export default router;
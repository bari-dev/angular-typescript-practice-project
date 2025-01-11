import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Joi from 'joi';

const JWT_SECRET = process.env.JWT_SECRET as string;

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'First name is required.',
    'string.min': 'First name must be at least 2 characters long.',
    'string.max': 'First name must not exceed 30 characters.',
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'Last name is required.',
    'string.min': 'Last name must be at least 2 characters long.',
    'string.max': 'Last name must not exceed 30 characters.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Please provide a valid email address.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
  }),
});

export const registerController: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: 'User registered successfully',
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.status(200).json({
      message: 'Login successful',
      token: token,
      user
    });
  } catch (error) {
    next(error);
  }
};

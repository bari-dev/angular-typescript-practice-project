import { Request, Response } from 'express';
import User from '../models/user';

export const getAllUsersController: any = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    debugger;
    console.log(users)
    res.json(users);
  } catch (error) {
    throw error
  }
};

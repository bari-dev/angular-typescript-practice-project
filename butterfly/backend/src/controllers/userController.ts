import { Request, Response } from 'express';
import User from '../models/user';

export const getAllUsersController: any = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    console.log(req.user)
    res.json(users);
  } catch (err) {
    throw err
  }
};


export const getCurrentUserProfile: any = async(req: Request, res: Response) => {
  try {
    const reqUser = req.user
    const user    = User.findByPk(reqUser?.id)
    const dashboard = {
      "totalTasklist": 0,
      "lastLogin": new Date,
      "totalTask": 0,
      "totalContributor": 0
    }
    res.json({user, dashboard})
  }catch (err){
    throw err
  }
}

export const updateCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const reqUser = req.user;
    
    if (!reqUser) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const user = await User.findByPk(reqUser.id);
    if (!user) {
      res.status(404).json({ message: 'User not found in database' });
      return;
    }

    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
};
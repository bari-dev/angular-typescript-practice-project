import { Request, Response } from "express";
import User from "../models/user";
import Notification from "../models/notification";
import TasklistService from "../services/tasklist.service";
import TaskService from "../services/task.service";

export const getAllUsersController: any = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    throw err;
  }
};


export const getUserStats: any = async (req: Request, res: Response) => {
  try {
    const totalTasks        = await TaskService.getTasksCountByUser(Number(req.user?.id)) || 0
    const totalTasklists    = await TasklistService.getTaskListCount(Number(req.user?.id)) || 0
    const totalContributors = await TasklistService.getAllUserCountByUser(Number(req.user?.id)) || 0
    res.json({ totalTasks, totalTasklists, totalContributors });
  } catch (err) {
    throw err;
  }
}

export const getCurrentUserProfile: any = async (
  req: Request,
  res: Response
) => {
  try {
    const reqUser = req.user;
    const user = User.findByPk(reqUser?.id);
    const dashboard = {
      totalTasklist: 0,
      lastLogin: new Date(),
      totalTask: 0,
      totalContributor: 0,
    };
    res.json({ user, dashboard });
  } catch (err) {
    throw err;
  }
};

export const getNotifications: any = async (req: Request, res: Response) => {
  try {
    const reqUser = req.user;
    const notifications = await Notification.findAll({
      where: { userId: reqUser?.id }});

      res.json({ notifications });
  } catch (err) {
    throw err;
  }
};

export const updateCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reqUser = req.user;

    if (!reqUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const user = await User.findByPk(reqUser.id);
    if (!user) {
      res.status(404).json({ message: "User not found in database" });
      return;
    }

    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

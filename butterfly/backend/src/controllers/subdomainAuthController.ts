import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Joi from "joi";
import UserInterface from "interfaces/user";
import TasklistInterface from "interfaces/tasklist";
import TaskList from "../models/tasklist";
import Task from "../models/task";
import TaskUser from "../models/taskuser";
import TasklistMember from "../models/tasklistMembers";

declare global {
  namespace Express {
    export interface Request {
      tasklistSlug: string;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const setResponse = (
  user: UserInterface,
  tasklist: TasklistInterface,
  token: string,
  message: string
): any => {
  return {
    message,
    token: token,
    tasklist,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
    },
  };
};

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.empty": "Email is required.",
    "string.pattern.base": "Kindly provide a valid email address.",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),

  tasklistSlug: Joi.string().required().messages({
    "string.empty": "Tasklist must be present.",
  }), 
});

export const subLoginController: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {    
  try {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    const user: UserInterface | null = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    const tasklist: any = await TaskList.findOne({
      where: { slug: req.body.tasklistSlug },
      include: [
        {
          model: TasklistMember,
          as: 'tasklistMembers',
          include: [
            {
              model: User,
              as: 'member'
            }
          ]
        }
      ]
    });

    if (!tasklist)
      return res.status(400).json({ message: "Tasklist not found." });

    const tasklistMember: any = await TasklistMember.findOne({
      where: { 
        tasklistId: tasklist.id,
        memberId: user.id
      },
    });

    if (!tasklistMember) {
      return res.status(400).json({ message: `You are not a member of ${tasklist.name} Tasklist` });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tasklistId: tasklist ? tasklist.id : null,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res
      .status(200)
      .json(setResponse(user, tasklist, token, "Login successful"));
  } catch (error) {
    next(error);
  }
};

import UserInterface from "./user.interface";

export interface TaskInterface {
  id: number;
  title: string;
  slug: string;
  description: string;
  completed: boolean;
  deadline: string;
  taskListId: number;
  creatorId?: number;
  users?: UserInterface[];
  createdAt: string;
  updatedAt: string;
}
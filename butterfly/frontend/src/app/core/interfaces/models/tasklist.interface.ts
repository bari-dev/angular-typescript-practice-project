import { TaskInterface } from "./task.interface";

interface TasklistUser {
  id: number;
  name: string;
}

interface TasklistInterface {
  id: number;
  name: string;
  creator: TasklistUser;
  slug: string;
  completed: boolean;
  dueDate: Date;
  tasks?: TaskInterface[];
  tasklistMembers: TasklistUser[];
  createdAt: Date;
  updatedAt: Date;
}

export default TasklistInterface;

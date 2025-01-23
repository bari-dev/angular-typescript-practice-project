import TaskInterface from "./task";
import UserInterface from "./user";

interface TasklistInterface {
  id: number;
  name: string;
  slug: string;
  tasks?: TaskInterface[];
  tasklistMembers?: UserInterface[] | [];
  createdAt: Date;
  updatedAt: Date;
}

export default TasklistInterface;

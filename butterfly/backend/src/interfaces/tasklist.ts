import TaskInterface from "./task";

interface TasklistInterface {
  id: number;
  name: string;
  slug: string;
  tasks?: TaskInterface[];
  createdAt: Date;
  updatedAt: Date;
}

export default TasklistInterface;

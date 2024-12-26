import TaskInterface from "./task";

interface TasklistInterface {
  id: number;
  name: string;
  tasks?: TaskInterface[];
  createdAt: Date;
  updatedAt: Date;
}

export default TasklistInterface;

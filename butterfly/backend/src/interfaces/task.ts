interface TaskInterface {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  deadline: Date;
  taskListId: number;
  assignedToUserId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export default TaskInterface;

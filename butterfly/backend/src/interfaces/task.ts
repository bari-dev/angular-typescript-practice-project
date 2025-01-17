interface TaskInterface {
  id: number;
  title: string;
  slug: string;
  description: string;
  completed: boolean;
  deadline: Date;
  taskListId: number;
  assignedToUserId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export default TaskInterface;

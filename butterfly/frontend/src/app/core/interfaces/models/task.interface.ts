export interface TaskInterface {
  id: number;
  title: string;
  slug: string;
  description: string;
  completed: number;
  deadline: string;
  taskListId: number;
  assignedToUserId: number;
  createdAt: string;
  updatedAt: string;
}
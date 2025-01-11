interface TasklistInterface {
  id: number;
  name: string;
  userId: number;
//   tasks?: TaskInterface[];
  createdAt: Date;
  updatedAt: Date;
}

export default TasklistInterface;

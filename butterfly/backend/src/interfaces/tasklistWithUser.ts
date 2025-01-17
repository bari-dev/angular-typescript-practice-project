import TaskInterface from "./task";

export interface TasklistCreator {
  id: number;
  firstName: string;
  lastName: string;
}

export interface TasklistWithUserInterface {
  id: number;
  name: string;
  slug: string;
  creator: TasklistCreator;
  tasks?: TaskInterface[];
  createdAt: Date;
  updatedAt: Date;
}

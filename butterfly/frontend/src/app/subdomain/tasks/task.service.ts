import { Injectable } from "@angular/core";
import { TaskInterface } from "src/app/core/interfaces/models/task.interface";
import { ButterflyClientApi } from "src/app/core/api/ClientApi";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private _clientApi: ButterflyClientApi) {}

  async deleteContactById(id: number): Promise<boolean> {
    return (await this._clientApi.deleteTaskById({ id })).deleted;
  }

  async getTasks(getTasksByTasklistSlug: string): Promise<any[]> {    
    return (await this._clientApi.getTasksByTasklistSlug(getTasksByTasklistSlug));
  }

  async createTask(input: any): Promise<TaskInterface> {
    return (await this._clientApi.createTask({ input })).task;
  }

  async updateTask(task: TaskInterface, taskId: number, taskListSlug: string): Promise<TaskInterface> {
    return (await this._clientApi.editTasksById({ task, taskId, taskListSlug })).task;
  }

  async getTaskBySearchFilter(slug: string, input: string): Promise<TaskInterface[]> {
    return await this._clientApi.getTasksBySearchFilter(slug, input);
  }

  async toggleStatus(tasklistSlug: string, taskId: number): Promise<TaskInterface> {
    return await this._clientApi.toggleTaskStatus(tasklistSlug, taskId);
  }

  async deleteTask(tasklistSlug: string, taskId: number): Promise<boolean> {
    return await this._clientApi.deleteTask(tasklistSlug, taskId);
  }
}

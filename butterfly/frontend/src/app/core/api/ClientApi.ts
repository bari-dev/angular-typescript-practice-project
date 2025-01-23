import { Injectable } from "@angular/core";
import axios, { AxiosInstance } from "axios";
import { TaskInterface } from "src/app/core/interfaces/models/task.interface";
import { env } from "src/environments/environment";
import { SubdomainAuthService } from "../services/subdomain-auth.service";

@Injectable({
  providedIn: "root",
})
export class ButterflyClientApi {
  private apiUrl: string = env.apiBaseUrl;
  private axiosInstance: AxiosInstance;

  constructor(private _subdomainAuthService: SubdomainAuthService) {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this._subdomainAuthService.getToken()}`,
      },
    });
  }

  async deleteTaskById(params: { id: number }): Promise<{ deleted: boolean }> {
    try {
      const response = await this.axiosInstance.delete(`/tasks/${params.id}`);
      return { deleted: response.data.deleted };
    } catch (error) {
      console.log("Error deleting contact:", error);
      throw error;
    }
  }

  async createTask(params: { input: TaskInterface }): Promise<{ task: TaskInterface }> {
    try {
      const response = await this.axiosInstance.post(`/tasklists/${this._subdomainAuthService.getTasklist().slug}/tasks`, params);
      return { task: response.data };
    } catch (error) {
      console.log("Error creating task:", error);
      throw error;
    }
  }

  async editTasksById(params: { task: TaskInterface; tasklistId: number}): Promise<{ task: TaskInterface }> {
    try {
      const response = await this.axiosInstance.put(`tasklist/${params.tasklistId}/tasks/${params.task.id}`, params);
      return { task: response.data.task };
    } catch (error) {
      console.log("Error editing task:", error);
      throw error;
    }
  }

  async getTasksBySearchFilter(input: string): Promise<TaskInterface[]> {
    try {
      const response = await this.axiosInstance.get(`/tasks?filter=${input}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching tasks:", error);
      throw error;
    }
  }

  async getTasksByTasklistSlug(slug: string): Promise<TaskInterface[]> {
    try {
      const response = await this.axiosInstance.get(`/tasklists/${slug}/tasks`);
      return response.data;
    } catch (error) {
      console.log("Error fetching tasks:", error);
      throw error;
    }
  }

  async toggleTaskStatus(tasklistSlug: string, taskId: number): Promise<TaskInterface> {
    try {
      const response = await this.axiosInstance.patch(`/tasklists/${tasklistSlug}/tasks/${taskId}/toggleStatus`);
      return response.data;
    } catch (error) {
      console.log("Error fetching tasks:", error);
      throw error;
    }
  }
}

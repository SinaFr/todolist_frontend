import { Task } from "../types";
import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:5242'; 

export const api = axios.create({
    baseURL: REST_API_BASE_URL,
    /* cookie is send */
    withCredentials: true,
});
 
export const listTasks = (accountId: string) =>
    api.get(`/accounts/${accountId}/tasks`);
  
export const createTask = (task: Task) =>
    api.post("/tasks", task);
  
export const getTask = (taskId: string) =>
    api.get(`/tasks/${taskId}`);
  
export const updateTask = (taskId: string, task: Task) =>
    api.put(`/tasks/${taskId}`, task);
  
export const deleteTask = (taskId: string) =>
    api.delete(`/tasks/${taskId}`);

export const getAccountIdByUsername = async (): Promise<string | null> => {
    try {
      const res = await api.get('/api/account');
      return res.data.id as string;
    } catch (error) {
      console.error("Error fetching account ID:", error);
      return null;
    }
};


 

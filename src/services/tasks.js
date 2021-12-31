import axios from "./api.config";
import { TODO_APP_URLS } from "../constants";

export const addTaskAPI = async (payload) => {
  return await axios.post(TODO_APP_URLS.ADD_TASK, payload);
};

export const removeTaskAPI = async (id) => {
  return await axios.delete(TODO_APP_URLS.REMOVE_TASK(id));
};

export const updateTaskAPI = async (payload) => {
  return await axios.put(TODO_APP_URLS.UPTADE_TASK, payload);
};
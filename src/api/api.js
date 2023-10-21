import api from "../api/setup.js";
export const TodoListGet =  () => api.get("/todo");
export const TodoListAdd = (body) => api.post("/todo", body);
export const TodoListSort = (body) => api.post("/sort", body);
export const TodoListDelete = (id) => api.delete(`/todo/${id}`);
export const TodoListUpdate = (id, body) => api.put(`/todo/${id}`, body);

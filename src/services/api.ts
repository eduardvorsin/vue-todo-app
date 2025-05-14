import { randomDelay } from "@/utils";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const API_ENDPOINTS = {
  TODOS: '/todos',
} as const;

export interface ITodo {
  id: string,
  text: string,
  status: 'active' | 'completed',
  date: string,
};

export async function fetchTodos(options?: {
  status: ITodo['status'],
}): Promise<ITodo[]> {
  const searchParams = new URLSearchParams();
  if (options?.status) {
    searchParams.append('status', options.status);
  }

  try {
    const response = await api.get<ITodo[]>(API_ENDPOINTS.TODOS, { params: searchParams });

    await randomDelay(500, 1000);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export async function createTodo(text: string): Promise<ITodo> {
  const newTodo: ITodo = {
    id: crypto.randomUUID(),
    text,
    status: 'active',
    date: new Date().toLocaleDateString('ru-RU'),
  };

  try {
    const response = await api.post<ITodo>(API_ENDPOINTS.TODOS, newTodo);

    await randomDelay(100, 500);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export async function deleteTodo(id: string): Promise<ITodo> {
  const url = `${API_ENDPOINTS.TODOS}/${id}`;
  try {
    const response = await api.delete<ITodo>(url);

    await randomDelay(100, 500);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export async function deleteCompletedTodos(): Promise<ITodo[]> {
  try {
    const completedTodos = await fetchTodos({ status: 'completed' });
    const deleteRequests = completedTodos.map(({ id }) => deleteTodo(id));
    const data = await Promise.all(deleteRequests);

    await randomDelay(100, 500);

    return data;
  } catch (err) {
    throw err;
  }
};

export async function updateTodo(id: string, options: Partial<Omit<ITodo, 'id'>>): Promise<ITodo> {
  const url = `${API_ENDPOINTS.TODOS}/${id}`;
  try {
    const response = await api.patch<ITodo>(url, {
      text: options.text,
      status: options.status,
    });

    await randomDelay(100, 500);

    return response.data;
  } catch (err) {
    throw err;
  }
};


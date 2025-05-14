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


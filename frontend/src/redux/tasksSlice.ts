import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

export interface Task {
  id: number;
  title: string;
  description: string;
  stage: string;
  category: number | null;
  created_at: string;
  completion_date: string;
}

interface TasksResponse {
  results: Task[];
  count: number;
}

interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  totalPages: number;
  totalCount: number;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  totalPages: 1,
  totalCount: 0,
  error: null,
};

const getErrorMessage = (error: any): string => {
  return error?.message || "An unknown error occurred.";
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({
    page,
    pageSize,
    categoryId,
    ordering,
    search,
  }: {
    page: number;
    pageSize: number;
    categoryId?: number | null;
    ordering?: string;
    search?: string;
  }) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("page_size", pageSize.toString());
    if (categoryId !== undefined && categoryId !== null) {
      params.append("category_id", categoryId.toString());
    }
    if (ordering) {
      params.append("ordering", ordering);
    }
    if (search) {
      params.append("search", search);
    }

    const url = `/tasks/?${params.toString()}`;
    const response = await api.get<TasksResponse>(url);

    return {
      tasks: response.results,
      totalPages: Math.ceil(response.count / pageSize),
      totalCount: response.count,
    };
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (newTask: Partial<Task>) => {
    const response = await api.post<Task, Partial<Task>>("/tasks/", newTask);
    return response;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task) => {
    const response = await api.put<Task, Task>(
      `/tasks/${updatedTask.id}/`,
      updatedTask
    );
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    await api.delete<void>(`/tasks/${taskId}/`);
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { tasks, totalPages, totalCount } = action.payload;
        state.status = "succeeded";
        state.tasks = tasks;
        state.totalPages = totalPages;
        state.totalCount = totalCount;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = getErrorMessage(action.error);
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload;
        state.tasks = state.tasks.filter((task) => task.id !== taskId);
      });
  },
});

export default tasksSlice.reducer;

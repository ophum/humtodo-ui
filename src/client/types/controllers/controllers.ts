import { TaskEntity } from '../entities/entities';
export interface SignInRequest {
  name: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface VerifyRequest {
  token: string;
}

export interface VerifyResponse {
  token: string;
}

export interface SignUpRequest {
  name: string;
  password: string;
}

export interface SignUpResponse {
  token: string;
}

export interface CreateProjectRequest {
  name: string;
}

export interface JoinProjectRequest {
  user_id: string;
}

export interface AddTodoRequest {
  title: string;
  assignee_id: string;
  start_datetime: string;
  scheduled_time: number;
  note: string;
}

export interface AddTodoResponse {
  task: TaskEntity;
}

export interface PatchTodoRequest {
  todo_id: string;
  patch_fields: string[];
  title?: string;
  assignee_id?: string;
  start_datetime?: string;
  scheduled_time?: number;
  actual_time?: number;
  note?: string;
  is_done?: boolean;
}

export interface PatchTodoResponse {
  task: TaskEntity;
}

export interface CreateTaskRequest {
  title: string;
  start_datetime: string;
  end_datetime: string;
  total_scheduled_time: number;
  assignee_ids: string[];
}

export interface CreateTaskResponse {
  task: TaskEntity;
}

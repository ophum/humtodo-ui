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

export interface JoinProjectRequest {
  user_id: string;
}

export interface CreateProjectRequest {
  name: string;
}

export interface CreateTaskResponse {
  task: TaskEntity;
}

export interface AddTodoRequest {
  assignee_id: string;
  start_datetime: string;
  scheduled_time: number;
  description: string;
}

export interface AddTodoResponse {
  task: TaskEntity;
}

export interface CreateTaskRequest {
  title: string;
  total_scheduled_time: number;
  assignee_ids: string[];
}

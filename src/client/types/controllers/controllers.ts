import { TaskEntity } from '../entities/entities';
export interface SignUpRequest {
  name: string;
  password: string;
}

export interface SignUpResponse {
  token: string;
}

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

export interface CreateProjectRequest {
  name: string;
}

export interface JoinProjectRequest {
  user_id: string;
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

export interface AddTodoRequest {
  assignee_id: string;
  start_datetime: string;
  scheduled_time: number;
  description: string;
}

export interface AddTodoResponse {
  task: TaskEntity;
}

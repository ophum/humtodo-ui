import { TaskEntity } from '../entities/entities';
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

export interface CreateProjectRequest {
  name: string;
}

export interface JoinProjectRequest {
  user_id: string;
}

export interface UpdateIsDoneTodoRequest {
  todo_id: string;
  is_done: boolean;
}

export interface UpdateIsDoneTodoResponse {
  task: TaskEntity;
}

export interface UpdateTitleTodoRequest {
  todo_id: string;
  title: string;
}

export interface UpdateTitleTodoResponse {
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

export interface ProjectEntity {
  _id?: string;
  name: string;
  ownerId: string;
  members: string[];
}

export interface TaskEntity {
  _id?: string;
  title: string;
  total_scheduled_time: number;
  todos: TodoEntity[];
  assignee_ids: string[];
  project_id: string;
}

export interface TodoEntity {
  assignee_id?: string;
  start_datetime: string;
  scheduled_time: number;
  actual_time: number;
  description: string;
}

export interface UserEntity {
  _id?: string;
  name: string;
  password: string;
}

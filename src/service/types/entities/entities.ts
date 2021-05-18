
export interface ProjectEntity {
	_id?: string;
	name: string;
	ownerId: string;
	members: string[];
};

export interface TaskEntity {
	_id?: string;
	title: string;
	plan: number;
	todos: TodoEntity[];
	assignee_ids: string[];
	project_id: string;
};

export interface TodoEntity {
	assignee_id?: string;
	start_datetime: string;
	end_datetime: string;
	description: string;
};

export interface UserEntity {
	_id?: string;
	name: string;
	password: string;
};


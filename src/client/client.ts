import HTTPClient from './base/client';
import {
  AddTodoRequest,
  AddTodoResponse,
  CreateProjectRequest,
  CreateTaskRequest,
  CreateTaskResponse,
  PatchTodoRequest,
  PatchTodoResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  VerifyRequest,
  VerifyResponse,
} from './types/controllers/controllers';

export default class Client extends HTTPClient {
  async signUp(req: SignUpRequest): Promise<SignUpResponse> {
    const res = await this._post('/api/auth/sign-up', req);
    if (res.ok) {
      return await res.json();
    }
    throw new Error('error');
  }

  async signIn(req: SignInRequest): Promise<SignInResponse> {
    const res = await this._post('/api/auth/sign-in', req);
    if (res.ok) {
      return await res.json();
    }
    throw new Error('error');
  }

  async verify(req: VerifyRequest): Promise<VerifyResponse> {
    const res = await this._post('/api/auth/verify', req);
    if (res.ok) {
      return await res.json();
    }
    throw new Error('error');
  }

  async projectFindAll(): Promise<any> {
    const res = await this._get('/api/projects');
    if (res.ok) {
      return await res.json();
    }
    throw new Error('error');
  }

  async projectFindWithTasks(id: string): Promise<any> {
    const res = await this._get('/api/projects/' + id);
    if (res.ok) {
      return await res.json();
    }
    throw new Error('error');
  }

  async projectCreate(req: CreateProjectRequest): Promise<any> {
    const res = await this._post('/api/projects', req);
    if (res.ok) {
      return await res.json();
    }
    throw new Error('error');
  }

  async taskCreate(
    project_id: string,
    req: CreateTaskRequest
  ): Promise<CreateTaskResponse> {
    const res = await this._post('/api/projects/' + project_id + '/tasks', req);
    if (res.ok) {
      return await res.json();
    }
    throw new Error('error');
  }

  async addTodo(
    projectId: string,
    taskId: string,
    req: AddTodoRequest
  ): Promise<AddTodoResponse> {
    const res = await this._post(
      '/api/projects/' + projectId + '/tasks/' + taskId + '/add-todo',
      req
    );
    if (res.ok) {
      return await res.json();
    }
    throw new Error('error');
  }

  async patchTodo(
    projectId: string,
    taskId: string,
    req: PatchTodoRequest
  ): Promise<PatchTodoResponse> {
    const res = await this._patch(
      `/api/projects/${projectId}/tasks/${taskId}/patch-todo`,
      req
    );
    if (res.ok) {
      return await res.json();
    }
    throw new Error('error');
  }
}

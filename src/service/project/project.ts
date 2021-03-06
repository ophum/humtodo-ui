import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useGlobalState } from '../../App';
import {
  ProjectEntity,
  TaskEntity,
} from '../../client/types/entities/entities';

export const useFindAllProject = () => {
  const [client] = useGlobalState('client');
  const [projects, setProjects] = useState([] as ProjectEntity[]);
  const [isLoading, setIsLoading] = useState(false);

  const reload = async () => {
    setIsLoading(true);

    try {
      const res = await client.projectFindAll();
      setProjects(res.projects as ProjectEntity[]);
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  return { projects, isLoading, reload };
};

export const useFindWithTasksProject = (projectId?: string) => {
  const [client] = useGlobalState('client');
  const [project, setProject] = useState({} as ProjectEntity);
  const [tasks, setTasks] = useState([] as TaskEntity[]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const reload = async () => {
    setIsLoading(true);
    try {
      const res = await client.projectFindWithTasks(projectId || id);
      setProject({
        ...res.project,
      });
      setTasks([...res.tasks]);
    } catch {
      return;
    } finally {
      setIsLoading(false);
    }
    return;
  };
  useEffect(() => {
    reload();
  }, []);

  return { project, tasks, isLoading, reload };
};

export const useCreateProject = () => {
  const [client] = useGlobalState('client');

  return async (name: string) => {
    await client.projectCreate({
      name,
    });
  };
};

export const useCreateTask = () => {
  const [client] = useGlobalState('client');

  return async (
    projectId: string,
    title: string,
    startDatetime: string,
    endDatetime: string,
    totalScheduledTime: number,
    assigneeIds: string[]
  ) => {
    const res = await client.taskCreate(projectId, {
      title: title,
      start_datetime: startDatetime,
      end_datetime: endDatetime,
      total_scheduled_time: totalScheduledTime,
      assignee_ids: assigneeIds,
    });
    return res.task;
  };
};

export const useAddTodo = () => {
  const [client] = useGlobalState('client');

  return async (
    projectId: string,
    taskId: string,
    title: string,
    startDatetime: string,
    scheduledTime: number,
    note: string
  ) => {
    const res = await client.addTodo(projectId, taskId, {
      title: title,
      start_datetime: startDatetime,
      scheduled_time: scheduledTime,
      note: note,
      assignee_id: '',
    });
    return res.task;
  };
};

export const useUpdateIsDoneTodo = () => {
  const [client] = useGlobalState('client');
  return async (
    projectId: string,
    taskId: string,
    todoId: string,
    isDone: boolean
  ) => {
    const res = await client.patchTodo(projectId, taskId, {
      todo_id: todoId,
      patch_fields: ['is_done'],
      is_done: isDone,
    });
    return res.task;
  };
};

export const useUpdateTitleTodo = () => {
  const [client] = useGlobalState('client');
  return async (
    projectId: string,
    taskId: string,
    todoId: string,
    title: string
  ) => {
    const res = await client.patchTodo(projectId, taskId, {
      todo_id: todoId,
      patch_fields: ['title'],
      title: title,
    });
    return res.task;
  };
};

export const useUpdateNoteTodo = () => {
  const [client] = useGlobalState('client');
  return async (
    projectId: string,
    taskId: string,
    todoId: string,
    note: string
  ) => {
    const res = await client.patchTodo(projectId, taskId, {
      todo_id: todoId,
      patch_fields: ['note'],
      note: note,
    });
    return res.task;
  };
};

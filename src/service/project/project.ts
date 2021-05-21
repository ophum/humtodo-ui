import { useGlobalState } from '../../App';
import {
  ProjectEntity,
  TaskEntity,
} from '../../client/types/entities/entities';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

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
    startDatetime: string,
    scheduledTime: number,
    description: string
  ) => {
    const res = await client.addTodo(projectId, taskId, {
      start_datetime: startDatetime,
      scheduled_time: scheduledTime,
      description: description,
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
    const res = await client.updateIsDoneTodo(projectId, taskId, {
      todo_id: todoId,
      is_done: isDone,
    });
    return res.task;
  };
};

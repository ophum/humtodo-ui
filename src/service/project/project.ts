import { useGlobalState } from '../../App';
import { ProjectEntity } from '../../client/types/entities/entities';

export const useFindAllProject = () => {
  const [client] = useGlobalState('client');

  return async () => {
    const res = await client.projectFindAll();
    return res.projects as ProjectEntity[];
  };
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
    totalScheduledTime: number,
    assigneeIds: string[]
  ) => {
    const res = await client.taskCreate(projectId, {
      title: title,
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

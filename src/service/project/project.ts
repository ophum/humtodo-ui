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
    project_id: string,
    title: string,
    plan: number,
    assignee_ids: string[]
  ) => {
    const res = await client.taskCreate(project_id, {
      title,
      plan,
      assignee_ids,
    });
    return res.task;
  };
};

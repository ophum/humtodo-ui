import { useGlobalState } from '../../App';

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

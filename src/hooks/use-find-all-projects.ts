import { useEffect, useState } from 'react';
import { useGlobalState } from '../App';
import { ProjectEntity } from '../client/types/entities/entities';

const useFindAllProjects = () => {
  const [client] = useGlobalState('client');
  const [projects, setProjects] = useState([] as ProjectEntity[]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const res = await client.projectFindAll();
        setProjects(res.projects as ProjectEntity[]);
      } catch (e) {
        throw new Error('error');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  return { projects, isLoading };
};

export default useFindAllProjects;
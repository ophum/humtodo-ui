import { VFC } from 'react';
import useFindAllProjects from '../hooks/use-find-all-projects';
import ProjectList from '../components/ProjectList';

const EnhancedProjectList: VFC = () => {
  const { projects, isLoading } = useFindAllProjects();

  // eslint-disable-next-line react/react-in-jsx-scope
  return <ProjectList {...{ projects, isLoading }} />;
};

export default EnhancedProjectList;
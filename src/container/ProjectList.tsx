import { VFC } from 'react';
import ProjectList from '../components/ProjectList';
import { useFindAllProject } from '../service/project/project';

const EnhancedProjectList: VFC = () => {
  const { projects, isLoading } = useFindAllProject();

  // eslint-disable-next-line react/react-in-jsx-scope
  return <ProjectList {...{ projects, isLoading }} />;
};

export default EnhancedProjectList;
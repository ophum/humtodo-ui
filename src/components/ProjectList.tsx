import React, { VFC } from 'react';
import { ProjectEntity } from '../client/types/entities/entities';

type Props = {
  projects: ProjectEntity[]
  isLoading: boolean
}

// eslint-disable-next-line react/prop-types
const ProjectList: VFC<Props> = ({ projects = [], isLoading = false }) => {
  return (
    <>
      {isLoading && 'ロード中...'}
      {!isLoading && projects.map((project) => {
        return (
          <li
            key={project._id}
          >
            {project.name}
          </li>
        );
      })}
    </>
  );
};

export default ProjectList;
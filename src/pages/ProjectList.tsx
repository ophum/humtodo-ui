import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ProjectEntity } from '../client/types/entities/entities';
import { useIsSignIn } from '../service/auth/auth';
import {
  useCreateProject,
  useFindAllProject,
} from '../service/project/project';

interface Props {
  newProjectName: string;
  projects: ProjectEntity[];
  isLoading: boolean;

  setNewProjectName: (e: string) => void;
  createProject: () => void;
}

function Presenter(props: Props) {
  const {
    newProjectName,
    projects,
    isLoading,
    setNewProjectName,
    createProject,
  } = props;
  const history = useHistory();

  return (
    <div>
      ProjectName:
      <br />
      <input
        type="text"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <br />
      <button type="button" onClick={createProject}>
        add
      </button>
      <br />
      {isLoading
        ? 'Loading...'
        : projects.map((v, k) => {
            return (
              <li
                key={k}
                onClick={() => {
                  history.push('/projects/' + v._id || '');
                }}
              >
                {v.name}
              </li>
            );
          })}
    </div>
  );
}

export default function ProjectList() {
  const history = useHistory();
  const [newProjectName, setNewProjectName] = useState('');
  const isSignIn = useIsSignIn();
  const { projects, isLoading, reload } = useFindAllProject();
  const createProject = useCreateProject();

  useEffect(() => {
    if (!isSignIn) {
      history.replace('/');
      return;
    }
    void reload();
  }, [isSignIn]);

  const handleCreateProject = async () => {
    try {
      await createProject(newProjectName);
      await reload();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Presenter
      newProjectName={newProjectName}
      projects={projects}
      setNewProjectName={setNewProjectName}
      createProject={handleCreateProject}
      isLoading={isLoading}
    />
  );
}

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ProjectEntity } from '../client/types/entities/entities';
import { useIsSignIn } from '../service/auth/auth';
import {
  useCreateProject,
} from '../service/project/project';

interface Props {
  newProjectName: string;
  projects: ProjectEntity[];

  setNewProjectName: (e: string) => void;
  createProject: () => void;
}

function Presenter(props: Props) {
  const { newProjectName, projects, setNewProjectName, createProject } = props;
  const history = useHistory();

  return (
    <div>
      ProjectName:
      <br />
      <input
        type='text'
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <br />
      <button type='button' onClick={createProject}>
        add
      </button>
      <br />
      {projects.map((v, k) => {
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
  const [projects, setProjects] = useState([] as ProjectEntity[]);
  const [newProjectName, setNewProjectName] = useState('');
  const isSignIn = useIsSignIn();
  const createProject = useCreateProject();

  useEffect(() => {
    if (!isSignIn) {
      history.replace('/');
      return;
    }
    syncProjects();
  }, [isSignIn]);

  const syncProjects = async () => {
    // try {
    //   const { projects } = await findAllProject();
    //   setProjects(projects);
    // } catch (e) {
    //   alert(e);
    // }
  };

  const handleCreateProject = async () => {
    try {
      await createProject(newProjectName);
      syncProjects();
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
    />
  );
}

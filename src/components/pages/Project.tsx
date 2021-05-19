import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useGlobalState } from '../../App';
import { useIsSignIn } from '../../service/auth/auth';
import {
  ProjectEntity,
  TaskEntity,
} from '../../client/types/entities/entities';

interface Props {
  newTask: TaskEntity;
  project: ProjectEntity;
  tasks: TaskEntity[];

  setNewTask: (t: TaskEntity) => void;
  createProject: () => void;
}

function Presenter(props: Props) {
  const { newTask, project, tasks, setNewTask, createProject } = props;

  return (
    <div>
      TaskTitle:
      <br />
      <input
        type="text"
        value={newTask.title}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            title: e.target.value,
          })
        }
      />
      <br />
      <button type="button" onClick={createProject}>
        add
      </button>
      <br />
      <p>{project.name}</p>
      {tasks.map((v, k) => {
        return <li key={k}>{v.title}</li>;
      })}
    </div>
  );
}

export default function Project() {
  const history = useHistory();
  const [client] = useGlobalState('client');
  const [project, setProject] = useState({} as ProjectEntity);
  const [tasks, setTasks] = useState([] as TaskEntity[]);
  const [newTask, setNewTask] = useState({} as TaskEntity);
  const { id } = useParams<{ id: string }>();
  const isSignIn = useIsSignIn();

  useEffect(() => {
    if (!isSignIn) {
      history.replace('/');
    } else {
      syncProject();
    }
  }, [isSignIn]);

  const syncProject = async () => {
    try {
      const res = await client.projectFindWithTasks(id);
      setProject({
        ...(res.project as ProjectEntity),
      });
      setTasks([...(res.tasks as TaskEntity[])]);
    } catch (e) {
      alert(e);
    }
  };

  const createProject = () => {
    (async () => {
      try {
        syncProject();
      } catch (e) {
        alert(e);
      }
    })();
  };

  return (
    <Presenter
      newTask={newTask}
      project={project}
      tasks={tasks}
      setNewTask={setNewTask}
      createProject={createProject}
    />
  );
}

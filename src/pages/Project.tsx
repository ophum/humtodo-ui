import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useGlobalState } from '../App';
import { ProjectEntity, TaskEntity } from '../client/types/entities/entities';
import { useIsSignIn } from '../service/auth/auth';
import { useCreateTask } from '../service/project/project';
import TaskItem from '../components/Project/TaskItem';

interface Props {
  newTask: TaskEntity;
  project: ProjectEntity;
  tasks: TaskEntity[];

  reload: () => void;
  setNewTask: (t: TaskEntity) => void;
  createTask: () => void;
}

function Presenter(props: Props) {
  const { newTask, project, tasks, reload, setNewTask, createTask } = props;

  return (
    <div>
      <h1>Project: {project.name}</h1>
      TaskTitle:{' '}
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
      開始日時:{' '}
      <input
        type="datetime-local"
        value={newTask.start_datetime}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            start_datetime: e.target.value,
          })
        }
      />
      <br />
      終了日時:{' '}
      <input
        type="datetime-local"
        value={newTask.end_datetime}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            end_datetime: e.target.value,
          })
        }
      />
      <br />
      予定時間(h):{' '}
      <input
        type="number"
        value={newTask.total_scheduled_time}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            total_scheduled_time: parseInt(e.target.value),
          })
        }
      />
      <br />
      <button type="button" onClick={createTask}>
        タスクを追加
      </button>
      <br />
      <br />
      <b>タスク一覧</b>
      {tasks.map((v, k) => {
        return <TaskItem key={k} task={v} reload={reload} />;
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
  const createTask = useCreateTask();

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

  const handleCreateTask = async () => {
    try {
      if (project._id) {
        await createTask(
          project._id,
          newTask.title,
          newTask.start_datetime,
          newTask.end_datetime,
          newTask.total_scheduled_time,
          newTask.assignee_ids
        );
        await syncProject();
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Presenter
      newTask={newTask}
      project={project}
      tasks={tasks}
      reload={syncProject}
      setNewTask={setNewTask}
      createTask={handleCreateTask}
    />
  );
}

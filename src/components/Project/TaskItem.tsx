import React, { useState } from 'react';
import { TaskEntity } from '../../client/types/entities/entities';
import { useUpdateIsDoneTodo } from '../../service/project/project';
import AddTodo from './AddTodo';

interface Props {
  task: TaskEntity;
  isOpen: boolean;
  reload: () => void;
  onToggle: () => void;
  updateIsDone: (todoId: string, isDone: boolean) => void;
}

function Presenter(props: Props) {
  const { task, isOpen, reload, onToggle, updateIsDone } = props;
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 4 }}>{task.title}</div>
        <div style={{ marginRight: 4 }}>{task.total_scheduled_time}h</div>
      </div>
      <div style={{ width: '100%' }}>
        {task.start_datetime} ~ {task.end_datetime} {task.total_scheduled_time}h
      </div>
      <div>
        {task.todos &&
          task.todos.map((v, k) => {
            return (
              <div key={k}>
                {k < task.todos.length - 1 ? '├ ' : '└ '}
                <input
                  type="checkbox"
                  onChange={() => updateIsDone(v._id || '', !v.is_done)}
                  checked={v.is_done}
                />
                {v.start_datetime} ~ {v.scheduled_time}h {v.description}
              </div>
            );
          })}
        <br />
        <div>
          <button onClick={onToggle}>{isOpen ? '閉じる' : '予定の作成'}</button>
        </div>
        {isOpen && (
          <>
            <AddTodo
              projectId={task.project_id}
              taskId={task._id || ''}
              reload={reload}
            />
          </>
        )}
      </div>
      <hr />
    </div>
  );
}

export interface TaskItemProps {
  task: TaskEntity;

  reload: () => void;
}

export default function TaskItem(props: TaskItemProps) {
  const { task, reload } = props;
  const [isOpen, setIsOpen] = useState(false);
  const updateIsDoneTodo = useUpdateIsDoneTodo();

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const updateIsDone = async (todoId: string, isDone: boolean) => {
    if (task._id) {
      await updateIsDoneTodo(task.project_id, task._id, todoId, isDone);
      await reload();
    }
  };
  return (
    <Presenter
      task={task}
      isOpen={isOpen}
      onToggle={onToggle}
      reload={reload}
      updateIsDone={updateIsDone}
    />
  );
}

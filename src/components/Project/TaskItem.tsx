import React, { useEffect, useState } from 'react';
import { TaskEntity, TodoEntity } from '../../client/types/entities/entities';
import AddTodo from './AddTodo';

interface Props {
  task: TaskEntity;
  isOpen: boolean;
  reload: () => void;
  onToggle: () => void;
}

function Presenter(props: Props) {
  const { task, isOpen, reload, onToggle } = props;
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 4 }}>{task.title}</div>
        <div style={{ marginRight: 4 }}>{task.total_scheduled_time}h</div>
        <div>
          <button onClick={onToggle}>{isOpen ? '閉じる' : '開く'}</button>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        {task.start_datetime} ~ {task.end_datetime} {task.total_scheduled_time}h
      </div>
      {isOpen && (
        <div>
          {task.todos &&
            task.todos.map((v, k) => {
              return (
                <div key={k}>
                  {k < task.todos.length - 1 ? '├' : '└'}
                  {v.start_datetime} ~ {v.scheduled_time}h {v.description}
                </div>
              );
            })}
          <br />
          <AddTodo
            projectId={task.project_id}
            taskId={task._id || ''}
            reload={reload}
          />
        </div>
      )}
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

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Presenter
      task={task}
      isOpen={isOpen}
      onToggle={onToggle}
      reload={reload}
    />
  );
}

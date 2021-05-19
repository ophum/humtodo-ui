import React, { useState } from 'react';
import { TaskEntity } from '../../client/types/entities/entities';
import AddTodo from './AddTodo';

interface Props {
  task: TaskEntity;
  isOpen: boolean;

  onToggle: () => void;
}

function Presenter(props: Props) {
  const { task, isOpen, onToggle } = props;
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 4 }}>{task.title}</div>
        <div style={{ marginRight: 4 }}>{task.plan}</div>
        <div>
          <button onClick={onToggle}>{isOpen ? '閉じる' : '開く'}</button>
        </div>
      </div>
      {isOpen && (
        <div>
          {task.todos &&
            task.todos.map((v, k) => {
              return <div key={k}>hoge</div>;
            })}
          <AddTodo taskId={task._id || ''} />
        </div>
      )}
    </div>
  );
}

export interface TaskItemProps {
  task: TaskEntity;
}

export default function TaskItem(props: TaskItemProps) {
  const { task } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return <Presenter task={task} isOpen={isOpen} onToggle={onToggle} />;
}

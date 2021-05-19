import React, { useState } from 'react';
import { TaskEntity } from '../../client/types/entities/entities';

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
      {isOpen && <div>予定を追加</div>}
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

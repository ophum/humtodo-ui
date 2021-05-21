import React, { useState } from 'react';
import { TodoEntity } from '../../client/types/entities/entities';

interface Props {
  todo: TodoEntity;
  prefix: '├ ' | '└ ';
  updateIsDone: (id: string, isDone: boolean) => void;
}

function Presenter(props: Props) {
  const { todo, prefix, updateIsDone } = props;
  const [isOpenNote, setIsOpenNote] = useState(false);

  const handleToggleIsOpenNote = () => {
    setIsOpenNote(!isOpenNote);
  };

  return (
    <div>
      {prefix}
      <input
        type="checkbox"
        onChange={() => updateIsDone(todo._id || '', !todo.is_done)}
        checked={todo.is_done}
      />
      <span style={{ cursor: 'pointer' }} onClick={handleToggleIsOpenNote}>
        {todo.title}
      </span>
      {isOpenNote && (
        <>
          <div>
            <div>
              <span
                style={{ width: 24, height: 'auto', display: 'inline-block' }}
              >
                {prefix === '├ ' && '│ '}
              </span>
              {todo.start_datetime} ~ {todo.scheduled_time}h
            </div>
            <span
              style={{ width: 24, height: 'auto', display: 'inline-block' }}
            >
              {prefix === '├ ' && '│ '}
            </span>
            {todo.note}
          </div>
        </>
      )}
    </div>
  );
}

export interface TodoItemProps {
  todo: TodoEntity;
  prefix: '├ ' | '└ ';

  updateIsDone: (id: string, isDone: boolean) => void;
}

export default function TodoItem(props: TodoItemProps) {
  const { todo, prefix, updateIsDone } = props;

  return <Presenter todo={todo} prefix={prefix} updateIsDone={updateIsDone} />;
}

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
        <div
          style={{
            margin: 10,
            marginTop: 2,
            padding: 2,
            border: '1px solid grey',
          }}
        >
          <div>
            予定開始時間: {todo.start_datetime}
            <br />
            予定時間: {todo.scheduled_time}h
          </div>
          Note:
          <br />
          <textarea>{todo.note}</textarea>
        </div>
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

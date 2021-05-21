import React, { useState } from 'react';
import { TodoEntity } from '../../client/types/entities/entities';

interface Props {
  todo: TodoEntity;
  prefix: '├ ' | '└ ';
  updateIsDone: (id: string, isDone: boolean) => void;
  updateTitle: (id: string, title: string) => void;
  updateNote: (id: string, note: string) => void;
}

function Presenter(props: Props) {
  const { todo, prefix, updateIsDone, updateTitle, updateNote } = props;
  const [isOpenNote, setIsOpenNote] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newNote, setNewNote] = useState(todo.note);

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
      <span>
        {isEditTitle ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
            onBlur={() => {
              updateTitle(todo._id || '', newTitle);
              setIsEditTitle(false);
            }}
          />
        ) : (
          <span onClick={() => setIsEditTitle(true)}>{todo.title}</span>
        )}{' '}
        {isOpenNote ? (
          <button
            type="button"
            style={{ fontSize: 8, cursor: 'pointer' }}
            onClick={handleToggleIsOpenNote}
          >
            閉じる
          </button>
        ) : (
          <button
            type="button"
            style={{ fontSize: 8, cursor: 'pointer' }}
            onClick={handleToggleIsOpenNote}
          >
            開く
          </button>
        )}
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
          <textarea
            onBlur={() => updateNote(todo._id || '', newNote)}
            onChange={(e) => {
              setNewNote(e.target.value);
            }}
            value={newNote}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export interface TodoItemProps {
  todo: TodoEntity;
  prefix: '├ ' | '└ ';

  updateIsDone: (id: string, isDone: boolean) => void;
  updateTitle: (id: string, title: string) => void;
  updateNote: (id: string, note: string) => void;
}

export default function TodoItem(props: TodoItemProps) {
  const { todo, prefix, updateIsDone, updateTitle, updateNote } = props;

  return (
    <Presenter
      todo={todo}
      prefix={prefix}
      updateIsDone={updateIsDone}
      updateTitle={updateTitle}
      updateNote={updateNote}
    />
  );
}

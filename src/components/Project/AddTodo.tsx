import React, { useState } from 'react';
import { TodoEntity } from '../../client/types/entities/entities';

interface Props {
  newTodo: TodoEntity;
  setNewTodo: (t: TodoEntity) => void;
}

function Presenter(props: Props) {
  const { newTodo, setNewTodo } = props;
  return (
    <div>
      開始日時:
      <input
        type="datetime-local"
        value={newTodo.start_datetime}
        onChange={(e) =>
          setNewTodo({
            ...newTodo,
            start_datetime: e.target.value,
          })
        }
      />
      <br />
      終了日時:
      <input
        type="datetime-local"
        value={newTodo.end_datetime}
        onChange={(e) =>
          setNewTodo({
            ...newTodo,
            end_datetime: e.target.value,
          })
        }
      />
      <br />
      備考:
      <br />
      <textarea
        onChange={(e) =>
          setNewTodo({
            ...newTodo,
            description: e.target.value,
          })
        }
      >
        {newTodo.description}
      </textarea>
      <br />
      <button>予定を追加</button>
    </div>
  );
}
export interface AddTodoProps {
  taskId: string;
}

export default function AddTodo(props: AddTodoProps) {
  const { taskId } = props;
  const [todo, setTodo] = useState({} as TodoEntity);
  return <Presenter newTodo={todo} setNewTodo={setTodo} />;
}

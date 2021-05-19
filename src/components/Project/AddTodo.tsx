import React, { useState } from 'react';
import { TodoEntity } from '../../client/types/entities/entities';
import { useAddTodo } from '../../service/project/project';

interface Props {
  newTodo: TodoEntity;
  setNewTodo: (t: TodoEntity) => void;
  onAddTodo: () => void;
}

function Presenter(props: Props) {
  const { newTodo, setNewTodo, onAddTodo } = props;
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
      予定時間(h):
      <input
        type="number"
        value={newTodo.scheduled_time}
        onChange={(e) =>
          setNewTodo({
            ...newTodo,
            scheduled_time: parseInt(e.target.value),
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
      <button onClick={onAddTodo}>予定を追加</button>
    </div>
  );
}
export interface AddTodoProps {
  projectId: string;
  taskId: string;

  reload: () => void;
}

export default function AddTodo(props: AddTodoProps) {
  const { projectId, taskId, reload } = props;
  const [todo, setTodo] = useState({} as TodoEntity);
  const addTodo = useAddTodo();

  const onAddTodo = async () => {
    try {
      await addTodo(
        projectId,
        taskId,
        todo.start_datetime,
        todo.scheduled_time,
        todo.description
      );
      setTodo({
        start_datetime: '',
        scheduled_time: 0,
        description: '',
      } as TodoEntity);
      reload();
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Presenter newTodo={todo} setNewTodo={setTodo} onAddTodo={onAddTodo} />
  );
}

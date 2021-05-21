import React, { useState } from 'react';
import { TaskEntity } from '../../client/types/entities/entities';
import {
  useUpdateIsDoneTodo,
  useUpdateNoteTodo,
  useUpdateTitleTodo,
} from '../../service/project/project';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

interface Props {
  task: TaskEntity;
  isOpen: boolean;
  reload: () => void;
  onToggle: () => void;
  updateIsDone: (todoId: string, isDone: boolean) => void;
  updateTitle: (todoId: string, title: string) => void;
  updateNote: (todoId: string, note: string) => void;
}

function Presenter(props: Props) {
  const {
    task,
    isOpen,
    reload,
    onToggle,
    updateIsDone,
    updateTitle,
    updateNote,
  } = props;
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
              <TodoItem
                key={k}
                todo={v}
                prefix={k < task.todos.length - 1 ? '├ ' : '└ '}
                updateIsDone={updateIsDone}
                updateTitle={updateTitle}
                updateNote={updateNote}
              />
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
  const updateTitleTodo = useUpdateTitleTodo();
  const updateNoteTodo = useUpdateNoteTodo();

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const updateIsDone = async (todoId: string, isDone: boolean) => {
    if (task._id) {
      await updateIsDoneTodo(task.project_id, task._id, todoId, isDone);
      await reload();
    }
  };

  const updateTitle = async (todoId: string, title: string) => {
    const todo = task.todos.find((v) => v._id === todoId);
    if (task._id && todo && todo.title !== title) {
      await updateTitleTodo(task.project_id, task._id, todoId, title);
      await reload();
    }
  };
  const updateNote = async (todoId: string, note: string) => {
    const todo = task.todos.find((v) => v._id === todoId);
    if (task._id && todo && todo.note !== note) {
      await updateNoteTodo(task.project_id, task._id, todoId, note);
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
      updateTitle={updateTitle}
      updateNote={updateNote}
    />
  );
}

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { TodoItem, TodoSteps } from "../models/todoItem";
import { Draggable } from "react-beautiful-dnd";
import { DeleteTodo, PutTodo } from "../api/TodoController";

export interface ISingleTodoProps {
  index: number;
  todo: TodoItem;
  todos: Array<TodoItem>;
  setTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>;
}

const SingleTodo: React.FC<ISingleTodoProps> = ({
  index,
  todo,
  todos,
  setTodos,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.name);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, orderId: number) => {
    e.preventDefault();
    let item = {
      name: editTodo,
      todoStep: todo.todoStep,
      orderId: todo.orderId,
    };
    PutTodo(item);
    setTodos(
      todos.map((todo) =>
        todo.orderId === orderId ? { ...todo, name: editTodo } : todo
      )
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    DeleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Draggable draggableId={todo.orderId.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.orderId)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : (
            <span className="todos__single--text">{todo.name}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;

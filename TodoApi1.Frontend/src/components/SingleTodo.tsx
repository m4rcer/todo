import React, { SyntheticEvent, useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Categories, TodoItem, TodoSteps } from "../models/todoItem";
import { Draggable } from "react-beautiful-dnd";
import { DeleteTodo, PutTodo } from "../api/TodoController";
import TodoDetails from "./TodoDetails";

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
  const [editTodoName, setEditTodoName] = useState<string>(todo.name);
  const [editTodoDescription, setEditTodoDescription] = useState<string>(
    todo.description
  );
  const [editTodoCategory, setEditTodoCategory] = useState<Categories>(
    todo.category
  );
  const handleShow = () => setEdit(true);
  const handleClose = () => setEdit(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, orderId: number) => {
    e.preventDefault();
    let item = {
      name: editTodoName,
      todoStep: todo.todoStep,
      orderId: todo.orderId,
      description: editTodoDescription,
      category: editTodoCategory,
    };
    PutTodo(item);
    setTodos(
      todos.map((todo) =>
        todo.orderId === orderId
          ? {
              ...todo,
              name: editTodoName,
              description: editTodoDescription,
              category: editTodoCategory,
            }
          : todo
      )
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    DeleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoName(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoDescription(e.target.value);
  };
  return (
    <>
      <Draggable draggableId={todo.orderId.toString()} index={index}>
        {(provided, snapshot) => (
          <form
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          >
            <span className="todos__single--text">{todo.name}</span>
            <div>
              <span
                className="icon edit-icon"
                onClick={() => {
                  handleShow();
                }}
              >
                <AiFillEdit />
              </span>
              <span
                className="icon delete-icon"
                onClick={() => handleDelete(todo.id)}
              >
                <AiFillDelete />
              </span>
            </div>
          </form>
        )}
      </Draggable>
      <TodoDetails
        edit={edit}
        todo={todo}
        handleClose={handleClose}
        handleNameChange={handleNameChange}
        handleEdit={handleEdit}
        editTodoName={editTodoName}
        handleDescriptionChange={handleDescriptionChange}
        editTodoDescription={editTodoDescription}
        editTodoCategory={editTodoCategory}
        setEditTodoCategory={setEditTodoCategory}
      />
    </>
  );
};

export default SingleTodo;

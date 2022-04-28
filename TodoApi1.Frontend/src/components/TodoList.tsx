import React from "react";
import { TodoItem } from "../models/todoItem";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { Form } from "react-bootstrap";

interface ITodoListProps {
  uncompletedTodos: Array<TodoItem>;
  setUncompletedTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>;
  InProgressTodos: Array<TodoItem>;
  setInProgressTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>;
  CompletedTodos: Array<TodoItem>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>;
}

const TodoList: React.FC<ITodoListProps> = ({
  uncompletedTodos,
  setUncompletedTodos,
  InProgressTodos,
  setInProgressTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="UncompleteTasks">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Uncomplete tasks</span>
            {uncompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={uncompletedTodos}
                todo={todo}
                key={todo.orderId}
                setTodos={setUncompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="InProgressTasks">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">In progress tasks</span>
            {InProgressTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={InProgressTodos}
                todo={todo}
                key={todo.orderId}
                setTodos={setInProgressTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="CompletedTasks">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.orderId}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;

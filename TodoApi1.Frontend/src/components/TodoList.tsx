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
      <ul className="todo-lists list-reset">
        <li>
          <Droppable droppableId="UncompleteTasks">
            {(provided, snapshot) => (
              <div
                className={`todos`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <span className="todos__heading">Uncomplete tasks</span>
                <div className="overflow">
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
              </div>
            )}
          </Droppable>
        </li>
        <li>
          <Droppable droppableId="InProgressTasks">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`todos`}
              >
                <span className="todos__heading">In progress tasks</span>
                <div className="overflow">
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
              </div>
            )}
          </Droppable>
        </li>
        <li>
          <Droppable droppableId="CompletedTasks">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`todos`}
              >
                <span className="todos__heading">Completed Tasks</span>
                <div className="overflow">
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
              </div>
            )}
          </Droppable>
        </li>
      </ul>
    </div>
  );
};

export default TodoList;

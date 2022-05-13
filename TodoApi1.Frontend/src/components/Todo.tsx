import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TodoItem, TodoSteps, Categories } from "../models/todoItem";
import {
  PostTodo,
  GetCompletedTodos,
  GetInProgressTodos,
  GetUncompletedTodos,
  RewriteCategory,
} from "../api/TodoController";

const Todo: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [UncompletedTodos, setUncompletedTodos] = useState<Array<TodoItem>>([]);
  const [InProgressTodos, setInProgressTodos] = useState<Array<TodoItem>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<TodoItem>>([]);
  const [result, setResult] = useState([{}]);

  useEffect(() => {
    GetUncompletedTodos(setUncompletedTodos);
    GetInProgressTodos(setInProgressTodos);
    GetCompletedTodos(setCompletedTodos);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    let id = await PostTodo({ name: todo, todoStep: TodoSteps.Uncomplete });
    if (todo) {
      setUncompletedTodos([
        ...UncompletedTodos,
        {
          id: id,
          name: todo,
          todoStep: TodoSteps.Uncomplete,
          orderId: id,
          description: "",
          category: Categories.NoCategory,
          creationDate: new Date(),
        },
      ]);
      setTodo("");
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let draggableItem;
    let uncompletedTodos = UncompletedTodos;
    let inProgressTodos = InProgressTodos;
    let completedTodos = CompletedTodos;
    // Source Logic
    if (source.droppableId === "UncompleteTasks") {
      draggableItem = uncompletedTodos[source.index];
      uncompletedTodos.splice(source.index, 1);
    } else if (source.droppableId === "InProgressTasks") {
      draggableItem = inProgressTodos[source.index];
      inProgressTodos.splice(source.index, 1);
    } else {
      draggableItem = completedTodos[source.index];
      completedTodos.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "UncompleteTasks") {
      draggableItem.todoStep = TodoSteps.Uncomplete;
      uncompletedTodos.splice(destination.index, 0, draggableItem);
    } else if (destination.droppableId === "InProgressTasks") {
      draggableItem.todoStep = TodoSteps.InProgress;
      inProgressTodos.splice(destination.index, 0, draggableItem);
    } else {
      draggableItem.todoStep = TodoSteps.Complete;
      completedTodos.splice(destination.index, 0, draggableItem);
    }
    setUncompletedTodos(uncompletedTodos);
    setInProgressTodos(inProgressTodos);
    setCompletedTodos(completedTodos);
    await RewriteCategory(uncompletedTodos, TodoSteps.Uncomplete);
    await RewriteCategory(inProgressTodos, TodoSteps.InProgress);
    await RewriteCategory(completedTodos, TodoSteps.Complete);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1 className="title">My Todo-s</h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          uncompletedTodos={UncompletedTodos}
          setUncompletedTodos={setUncompletedTodos}
          InProgressTodos={InProgressTodos}
          setInProgressTodos={setInProgressTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default Todo;

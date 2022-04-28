import { Http2ServerResponse } from "http2";
import React, { useState } from "react";
import { TodoItem, TodoSteps } from "../models/todoItem";

const BASE_PATH = "https://localhost:44347/api/";
const CONTROLLER_PATH = "Todo/";

export const GetUncompletedTodos = async (
  setUncompleteTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>
): Promise<void> => {
  await fetch(`${BASE_PATH}${CONTROLLER_PATH}0`)
    .then((res) => res.json())
    .then((res) => setUncompleteTodos(res));
};

export const GetInProgressTodos = (
  setInProgressTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>
): void => {
  fetch(`${BASE_PATH}${CONTROLLER_PATH}1`)
    .then((res) => res.json())
    .then((res) => setInProgressTodos(res));
};

export const GetCompletedTodos = (
  setCompletedTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>
): void => {
  fetch(`${BASE_PATH}${CONTROLLER_PATH}2`)
    .then((res) => res.json())
    .then((res) => setCompletedTodos(res));
};

export const PostTodo = async (todo: { name: string; todoStep: number }) => {
  let id: number = 0;
  let item = {
    name: todo.name.trim(),
    todoStep: todo.todoStep,
  };
  await fetch(`${BASE_PATH}${CONTROLLER_PATH}`, {
    method: "post",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((res) => (id = res));
  return id;
};

export const PostManyTodo = async (
  todos: Array<{ orderId: number; name: string; todoStep: TodoSteps }>
) => {
  await fetch(`${BASE_PATH}${CONTROLLER_PATH}many`, {
    method: "post",
    body: JSON.stringify(todos),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};

export const DeleteTodo = (id: number): void => {
  let link = `${BASE_PATH}${CONTROLLER_PATH}` + id;
  fetch(link, { method: "DELETE" });
};

export const DeleteManyTodo = async (step: TodoSteps): Promise<void> => {
  await fetch(`${BASE_PATH}${CONTROLLER_PATH}many/${step}`, {
    method: "delete",
  });
};

export const PutTodo = async (item: {
  name: string;
  todoStep: TodoSteps;
  orderId: number;
}): Promise<void> => {
  await fetch(`${BASE_PATH}${CONTROLLER_PATH}`, {
    method: "put",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};

export const RewriteCategory = async (
  todos: Array<TodoItem>,
  step: TodoSteps
): Promise<void> => {
  let items: Array<{ orderId: number; name: string; todoStep: TodoSteps }> = [];
  todos.forEach((item) => {
    items.push({
      orderId: item.orderId,
      name: item.name,
      todoStep: item.todoStep,
    });
  });
  await DeleteManyTodo(step);
  await PostManyTodo(items);
};

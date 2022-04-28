import React, { useState, useEffect } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { TodoItem } from "./models/todoItem";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Todo from './components/Todo';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
	const [result, setResult] = useState([{}]);

  return (
    <>
	<Todo/>
	</>
  );
};

export default App;


import React, { useRef } from "react";
import { PostTodo } from "../api/TodoController";
import "./styles.css";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        if (todo.length>=1 && todo.length<=50)
        {
          handleAdd(e);
          inputRef.current?.blur();
        }
        else {
          e.preventDefault();
        }
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        Add
      </button>
    </form>
  );
};

export default InputField;

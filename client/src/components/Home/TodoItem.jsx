import React, { useContext } from "react";
import { Data } from "../Context/TodoContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import {
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const TodoItem = ({ todo, index }) => {
  const { user } = useAuthContext();
  const {
    deleteTodo,
    markCompleted,
    markInCompleted,
    toggleTodo, // Use toggleTodo from the context
  } = useContext(Data);

  const handleToggleTodo = () => {
    toggleTodo(todo.id, todo.completed);
    console.log(todo.id);
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(todo.id);
    console.log(todo.id);
  };

  console.log(todo);

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
      <div className="flex items-center">
        <span className="mr-4 text-gray-500">{index + 1}.</span>
        <span
          className={`mr-4 ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.todo}
        </span>
      </div>
      <div className="space-x-3 ml-8">
        <button
          className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={handleToggleTodo}
        >
          {todo.completed ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        <button
          className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={handleDeleteTodo}
        >
          <FaTrash />
        </button>
        {!todo.completed && (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => markCompleted(todo.id)}
          >
            <FaCheck />
          </button>
        )}
        {todo.completed && (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => markInCompleted(todo.id)}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;

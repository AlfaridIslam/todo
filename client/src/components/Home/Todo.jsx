import React, { useState, useEffect, useContext } from "react";
import { BsPlus, BsSearch } from "react-icons/bs";
import axios from "axios";
import { Data } from "../Context/TodoContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import FilterButtons from "./FilterButton";
import TodoList from "./TodoList";
import { useLogout } from "../Hooks/useLogout";

const Todo = () => {
  const { user } = useAuthContext();
  const { todos, setTodos, form, setForm, getTodos, deleteTodo } =
    useContext(Data);

  console.log(user);

  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  const [newTodoText, setNewTodoText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [updateForm, setUpdateForm] = useState({ id: null, todo: "" });

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, []);

  // ADD TODO
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim() || !user) return;

    const response = await axios.post(
      "http://127.0.0.1:4000/api/v1/todo/",
      { todo: newTodoText, user_id: user.user_id },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setTodos([...todos, response.data]);
    setNewTodoText("");
    getTodos();
  };

  // UPDATE TODO
  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (!updateForm.id || !user) return;

    await axios.patch(
      `http://127.0.0.1:4000/api/v1/todo/${updateForm.id}`,
      { todo: updateForm.todo },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setUpdateForm({ id: null, todo: "" });
    getTodos();
  };

  // SEARCH TODO
  const handleSearchChange = async (value) => {
    setSearchTerm(value);
    if (!value.trim() || !user) return;

    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/v1/todo//:user_id/search?searchTerm=${encodeURIComponent(
          value
        )}`, // Correctly use 'searchTerm'
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data && response.data.todos) {
        setTodos(response.data.todos); // Ensure to access the correct part of the response
      } else {
        console.log("No todos found.");
      }
    } catch (error) {
      console.error("Error searching todos:", error);
    }
  };


  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
      <div className="flex justify-around items-center">
        <p className="mt-3 mb-6 text-2xl font-bold text-center uppercase">
          TaskMaster Pro
        </p>
        <span>{user.id}</span>
        {}
        <button onClick={handleClick}>LOGOUT</button>
      </div>
      <div
        className="flex items-center mb-4"
        onSubmit={updateForm.id ? handleUpdateTodo : handleAddTodo}
      >
        <input
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          type="text"
          name="addTodo"
          id="addTodo"
          placeholder="Add Todo"
          className="my-3 flex-grow p-2 border-b-2 rounded border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-green-600 focus:outline-none"
          onClick={handleAddTodo}
        >
          <BsPlus />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      <TodoList
        todos={todos}
        handleUpdateTodo={(id, todo) => setUpdateForm({ id, todo })}
        onDeleteTodo={deleteTodo}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Todo;

import React, { useContext } from "react";
import { Data } from "../Context/TodoContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import TodoItem from "./TodoItem";

const TodoList = ({ searchTerm }) => {
  const { user } = useAuthContext();

  const { todos, filter, filterTodos } = useContext(Data);

  console.log(todos);

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  // Check if todos is null before filtering
  const filteredTodos = todos?.filter((todo) => {
    const matchesFilter =
      (filter === "Complete" && todo.completed) ||
      (filter === "Incomplete" && !todo.completed) ||
      filter === "Default";

    const matchesSearch = todo.todo
      .toLowerCase()
      .includes(lowerCaseSearchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  console.log("Filtered Todos:", filteredTodos);

  return (
    <ul>
      <li className="my-2 text-sm italic">All Your Notes Here...</li>
      {todos?.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} />
      ))}
    </ul>
  );
};

export default TodoList;

import React, { useContext } from "react";
import { Data } from "../Context/TodoContext";
import { useAuthContext } from "../Hooks/useAuthContext";

const FilterButtons = () => {
  const { user } = useAuthContext();
  const { filter, filterTodos, markAllCompleted } = useContext(Data); // Destructure required context values

  const handleFilter = (filter) => {
    filterTodos(filter);
  };

  return (
    <div className="flex space-x-4 items-center">
      <select
        className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none"
        value={filter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="ALL">Default</option>
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETE">Incomplete</option>
      </select>

      <button
        className="text-sm px-2 py-1 bg-purple-500 text-white rounded ml-2"
        onClick={() => markAllCompleted()}
      >
        Mark All Completed
      </button>
    </div>
  );
};

export default FilterButtons;

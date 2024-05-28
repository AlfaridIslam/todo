import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";

export const Data = createContext();

const TodoContext = ({ children }) => {
  const { user } = useAuthContext();
  console.log(user);

  // GET REQUEST STATE
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("ALL");

  // Get request function
  const getTodos = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      setTodos([]);

      const response = await axios.get(
        `http://127.0.0.1:4000/api/v1/todo/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const data = response?.data?.todo;
      setTodos(data);
    } catch (error) {
      console.error("There was an error fetching the todos:", error);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  // DELETE TODO
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:4000/api/v1/todo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("response");

      // Call getTodos after successful deletion to update the state
      getTodos();
    } catch (error) {
      console.error("There was an error deleting the todo:", error);
    }
  };

  // TOGGLE TODO COMPLETION
  const toggleTodo = async (id, currentStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:4000/api/v1/todo/${id}`,
        { completed: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getTodos();
    } catch (error) {
      console.error("There was an error toggling the todo:", error);
    }
  };

  // FILTER TODOS
  const filterTodos = async (filter) => {
    setFilter(filter);
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/v1/todo`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { filter },
      });
      const data = response.data;
      setTodos(data);
    } catch (error) {
      console.error("There was an error fetching the todos:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      console.log(1000);
      getTodos();
    }
  }, []);

  // MARK ALL COMPLETED
  const markAllCompleted = async () => {
    if (!user) return;
    try {
      await axios.patch(
        `http://127.0.0.1:4000/api/v1/todo/${user_id}/mark-all-completed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getTodos();
    } catch (error) {
      console.error(
        "There was an error marking all todos as completed:",
        error
      );
    }
  };

  // MARK COMPLETED
  const markCompleted = async (id) => {
    if (!user) return;
    try {
      await axios.patch(
        `http://127.0.0.1:4000/api/v1/todo/${id}/completed`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getTodos();
    } catch (error) {
      console.error("There was an error marking the todo as completed:", error);
    }
  };

  // MARK INCOMPLETED
  const markInCompleted = async (id) => {
    if (!user) return;
    try {
      await axios.patch(
        `http://127.0.0.1:4000/api/v1/todo/${id}/incompleted`,
        { completed: false },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getTodos();
    } catch (error) {
      console.error(
        "There was an error marking the todo as incomplete:",
        error
      );
    }
  };

  return (
    <Data.Provider
      value={{
        todos,
        setTodos,filter, setFilter,
        getTodos,
        deleteTodo,
        filterTodos,
        markAllCompleted,
        markCompleted,
        markInCompleted,
        toggleTodo, // Add toggleTodo to the context value
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default TodoContext;

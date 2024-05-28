import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Todo from "./components/Home/Todo";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { useAuthContext } from "./components/Hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user?.id ? <Todo /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

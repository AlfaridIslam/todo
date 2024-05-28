import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContext from "./components/Context/AuthContext.jsx";
import TodoContext from "./components/Context/TodoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <TodoContext>
      <App />
    </TodoContext>
  </AuthContext>
);

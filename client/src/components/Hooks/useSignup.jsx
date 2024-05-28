import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  

  const signup = async (email, password) => {
    setError(null);

    const response = await fetch("http://localhost:4000/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      // save user data in local storage
      localStorage.setItem("user", JSON.stringify(data));
    }
  };
  return { signup, error };
};

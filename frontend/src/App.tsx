import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import TopBar from "./components/TopBar";
import Spinner from "./components/Spinner";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/auth", {
        withCredentials: true,
      });
      if (response.data.status) {
        const response1 = await axios.get(
          "http://localhost:5000/api/user/home",
          {
            withCredentials: true,
          }
        );
        if (response1.data.status) {
          setLoader(true);
          setTodos(response1.data.todos);
        }
      } else {
        setShowSignIn(false);
      }
    } catch (error) {
      console.log("Error in getting todos", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleReloadTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/home", {
        withCredentials: true,
      });
      if (response.data.status) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.error("Error reloading todos:", error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              showSignIn ? (
                loader ? (
                  <div className="font-poppins">
                    <TopBar />
                    <Todos todos={todos} onReloadTodos={handleReloadTodos} />
                    <AddTodo onReloadTodos={handleReloadTodos} />
                  </div>
                ) : (
                  <Spinner />
                )
              ) : (
                <SignIn />
              )
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

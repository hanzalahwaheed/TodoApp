import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import TopBar from "./components/TopBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/home", {
        withCredentials: true,
      });
      if (response.data.status) setLoader(true);
      setTodos(response.data.todos);
    } catch (error) {
      console.log("Error in getting todos", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [loader]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loader ? (
                <div className="font-poppins">
                  <TopBar />
                  <Todos todos={todos} />
                  <AddTodo />
                </div>
              ) : (
                <Spinner />
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

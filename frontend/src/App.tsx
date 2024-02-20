import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TopBar from "./components/TopBar";
import { authState } from "./store/Auth";
import axios from "axios";

const App = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies(["jwt"]);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/auth",
          {
            withCredentials: true,
          }
        );        
        if (response) {
          setAuth({
            isAuthenticated: true,
            userEmail: response.data,
          });
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setAuth({ isAuthenticated: false, userEmail: "asdfasdfasdfasdf" });
      }
    };
    fetchAuthStatus();
  }, [cookie.jwt]);

  if (!loading) return <div> Loading...</div>;
  else
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              auth.isAuthenticated ? (
                <div className="font-poppins">
                  <TopBar />
                  <Todos />
                  <AddTodo />
                </div>
              ) : (
                <>
                  <TopBar />
                  <SignIn />
                </>
              )
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;

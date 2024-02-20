import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../store/Auth";
import { CookiesProvider, useCookies } from "react-cookie";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const [cookies, setCookie] = useCookies(["jwt"]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const login = (user: string, token: string) => {
    setAuth({
      isAuthenticated: true,
      userEmail: user,
    });
    setCookie("jwt", token, { path: "/" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signin",
        {
          email: email,
          password: password,
        }
        // { withCredentials: true }
      );
      console.log("Response from server:", response.data);
      login(email, response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="bg-blue-100 p-4 w-1/2 ">
        <form
          action=""
          method="post"
          className=" flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="p-2 bg-blue-200 placeholder:text-black "
            onChange={handleEmail}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="p-2 bg-yellow-300 placeholder:text-black "
            onChange={handlePassword}
          />
          <button type="submit" className="p-2 bg-yellow-300">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

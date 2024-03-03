import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        formData
      );
      if (response.data.status) {
        navigate("/signin");
      }
    } catch (error) {
      console.log("SignUp handleSubmit", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="h-screen flex items-center justify-center ">
        <div className="bg-blue-100 p-4 w-1/2 ">
          <form
            action=""
            method="post"
            className=" flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 bg-yellow-200 placeholder:text-black "
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 bg-yellow-200 placeholder:text-black "
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 bg-yellow-200 placeholder:text-black "
              onChange={handleChange}
            />
            <button
              type="submit"
              className="p-2 bg-yellow-200 hover:bg-yellow-400"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

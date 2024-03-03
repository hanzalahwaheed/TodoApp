import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ status: boolean }>(
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    // <div>
    //   <div className="h-screen flex items-center justify-center ">
    //     <div className="bg-blue-100 p-4 w-1/2 ">
    //       <form
    //         action=""
    //         method="post"
    //         className=" flex flex-col gap-2"
    //         onSubmit={handleSubmit}
    //       >
    //         <input
    //           type="text"
    //           name="username"
    //           placeholder="Username"
    //           className="p-2 bg-yellow-200 placeholder:text-black "
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="Email"
    //           className="p-2 bg-yellow-200 placeholder:text-black "
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           className="p-2 bg-yellow-200 placeholder:text-black "
    //           onChange={handleChange}
    //         />
    //         <button
    //           type="submit"
    //           className="p-2 bg-yellow-200 hover:bg-yellow-400"
    //         >
    //           Sign Up
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="h-screen flex items-center justify-center ">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="very cool username"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already a user?{" "}
            <a
              href="/signin"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

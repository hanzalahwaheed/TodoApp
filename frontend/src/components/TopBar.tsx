import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userEmailState } from "../store/User";

const TopBar = () => {
  const [loader, setLoader] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);

  const checkAuth = async () => {
    axios
      .get("http://localhost:5000/api/user/auth", { withCredentials: true })
      .then((response) => {
        if (response.data.status) {
          setLoader(true);
          setUserEmail(response.data.useremail);
        }
      });
  };

  const handleLogout = async () => {
    axios
      .get("http://localhost:5000/api/user/logout", { withCredentials: true })
      .then((response) => {
        if (response.data.status) {
          setLoader(false);
          navigate("/signin");
        }
      });
  };

  useEffect(() => {
    checkAuth();
  });

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Your Todos
          </span>
        </a>
        <div className="self-center text-sm font-semibold whitespace-nowrap dark:text-white">
        {userEmail}
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {loader ? (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;

import React from "react";

const SignUp = () => {
  return (
    <div>
      <div className="bg-yellow-200 p-4 w-1/2 m-auto">
        <form action="" method="post" className=" flex flex-col gap-2">
          <input type="text" name="username" className="bg-yellow-400" />
          <input type="email" name="email" className="bg-yellow-400" />
          <input type="password" name="password" className="bg-yellow-400" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

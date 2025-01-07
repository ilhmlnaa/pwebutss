import React from "react";
import LoginRegister from "../components/LoginRegister";

const Auth = () => {
  return (
    <div className="flex h-svh">
      <div
        className="hidden md:hidden lg:block w-full bg-cover bg-center rounded-r-lg"
        style={{ backgroundImage: "url('dex.png')" }}
      ></div>

      <LoginRegister />
    </div>
  );
};

export default Auth;

import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center  gap-4 p-8 w-full">
      <img src="emot.png" alt="" className="w-44 h-44 absolute" />
      <p className="relative top-28 left-5 font-bold text-red-400">
        Page Not Found!
      </p>
    </div>
  );
};

export default NotFound;

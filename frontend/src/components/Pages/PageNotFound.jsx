import React from "react";
import { useNavigate } from "react-router-dom";
import { FcFilmReel } from "react-icons/fc";

const PageNotFound = () => {
  const navigate = useNavigate();
  function clickHandler() {
    navigate("/");
  }

  return (
    <div className="w-full min-h-[100vh] relative top-8 flex items-center justify-center">
      <div className="w-full h-max flex flex-col items-center justify-center gap-y-5">
        <div className="custom-text sm:text-[8vw] text-[70px] flex items-center justify-center">
          <p>4</p>
          <FcFilmReel className="text-yellow-600" />
          <p>4</p>
        </div>

        <div className="w-[70%] h-[2px] bg-black"></div>
        <p className="sm:text-[4vw] text-[30px] text-red-600 font-bold">
          Page not found
        </p>
        <p className="sm:text-[15px] text-[grey] font-semibold text-center">
          Soory, we can't find the page you're looking for !
        </p>
        <button
          className="w-[150px] h-[40px] bg-green-500 text-white rounded-sm hover:scale-110 transition-all "
          onClick={clickHandler}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;

import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { ImHome } from "react-icons/im";

const BottomNavBar = () => {
  // const logo = require("../../utils/png-clipart-bookmyshow-office-android-ticket-android-text-logo-removebg-preview.png");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        zIndex: "999",
      }}
      className="sm:opacity-0 opacity-100 w-full h-[50px] p-3 fixed bottom-0 bg-white flex"
    >
      <ul className="flex items-center justify-between bg-white w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-rose-500" : "text-black"
          }
        >
          <li>
            <div className="flex flex-col items-center justify-center">
              <ImHome className="w-[30px] h-[20px]" />
              <p>Home</p>
            </div>
          </li>
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? "text-rose-500" : "text-black"
          }
        >
          <li className="flex flex-col items-center justify-center">
            <BsFillCameraReelsFill className="w-[30px] h-[20px]" />
            <p>Movies</p>
          </li>
        </NavLink>
        <NavLink
          to={user ? "/book/transactions" : "/login"}
          className={({ isActive }) =>
            isActive ? "text-rose-500" : "text-black"
          }
        >
          <li className="flex flex-col items-center justify-center">
            <BsFillTicketPerforatedFill className="w-[30px] h-[20px]" />
            <p>Your Tickets</p>
          </li>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-rose-500" : "text-black"
          }
        >
          <li className="flex flex-col items-center justify-center">
            <IoPersonSharp className="w-[30px] h-[20px]" />
            <p className="text-[12px] font-[400]">Profile</p>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default BottomNavBar;

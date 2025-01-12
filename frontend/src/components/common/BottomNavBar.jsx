import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { ImHome } from "react-icons/im";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };
    handleStorageChange();
  }, [navigate]);

  return (
    <div className="w-full h-[50px] opacity-100 sm:opacity-0 px-5 py-3 fixed bottom-0 bg-white flex z-50">
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
        {user?.accountType === "SuperAdmin" && (
          <NavLink
            to={user ? "/cities-revenue" : "/login"}
            className={({ isActive }) =>
              isActive ? "text-rose-500" : "text-black"
            }
          >
            <li className="flex flex-col items-center justify-center">
              <BsFillTicketPerforatedFill className="w-[30px] h-[20px]" />
              <p>Revenue</p>
            </li>
          </NavLink>
        )}
        {user?.accountType === "Admin" && (
          <NavLink
            to={user ? "/admin-revenue" : "/login"}
            className={({ isActive }) =>
              isActive ? "text-rose-500" : "text-black"
            }
          >
            <li className="flex flex-col items-center justify-center">
              <BsFillTicketPerforatedFill className="w-[30px] h-[20px]" />
              <p>Revenue</p>
            </li>
          </NavLink>
        )}
        {(user == null || user?.accountType === "Viewer") && (
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
        )}
        <NavLink
          to={user ? "/profile" : "/signup"}
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

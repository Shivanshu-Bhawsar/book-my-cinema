import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormSearch } from "react-icons/gr";
import { setToken } from "../../redux/reducer/authSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = useSelector((state) => state.auth);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logo = require("../../utils/png-clipart-bookmyshow-office-android-ticket-android-text-logo-removebg-preview.png");

  useEffect(() => {
    if (token) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
  }, []);

  const logoutClickHandler = () => {
    localStorage.clear();
    dispatch(setToken(null));
    setIsLogedIn(false);
    navigate("/");
    toast.success("Logout Successfully");
  };

  return (
    <div className="w-full bg-white flex items-start justify-center py-3 px-3 sm:px-5 md:px-7">
      <div className="w-full flex items-center justify-between">
        <div className="w-[60%] flex items-center gap-3 sm:gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-1 justify-center text-[rgb(47,47,47)] text-base lg:text-lg font-medium transform scale-y-150"
          >
            <h2>book</h2>
            <div className="-ml-[12px] -mr-[14px] w-[52px] h-[28px] sm:w-[52px] sm:h-[28px] text-white rotate-12 inline-block">
              <img src={logo} className="-rotate-12 w-full h-full"></img>
            </div>
            <h2>cinema</h2>
          </NavLink>
          <div className="w-[75%] opacity-0 sm:opacity-100 flex items-center justify-center">
            <div className="relative w-full">
              <input
                className="w-full text-xs lg:text-sm h-[30px] sm:h-[33px] lg:h-[36px] border-gray-300 border rounded-md pl-10 pr-3 outline-none font-sans"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
              />
              <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">
                <GrFormSearch className="w-[30px] h-[25px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 sm:gap-5">
          {isLogedIn ? (
            <button
              onClick={logoutClickHandler}
              className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium text-center bg-rose-500 text-white border-rose-500 rounded-md border"
            >
              Log Out
            </button>
          ) : (
            <div className="flex gap-0 sm:gap-4">
              <NavLink
                to="/login"
                className="px-3 sm:px-4 py-1 text-[11px] sm:text-sm font-medium text-center bg-rose-500 text-white border-rose-500 rounded-md border"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/signup"
                className="hidden sm:block px-3 sm:px-4 py-1 text-[11px] sm:text-sm font-medium text-center bg-rose-500 text-white border-rose-500 rounded-md border"
              >
                Sign up
              </NavLink>
            </div>
          )}

          <div>
            {/* Hamburger menu toggle for small screens */}
            <span
              onClick={() => setMenuOpen(!menuOpen)}
              className="block md:hidden"
            >
              <RxHamburgerMenu className="text-[22px] sm:text-[26px] cursor-pointer text-[gray]" />
            </span>

            {/* Navigation menu - visible only on small screens */}
            {menuOpen && (
              <div
                className={`block md:hidden absolute top-12 left-0 w-full text-center bg-white shadow-md z-50`}
              >
                {user?.accountType === "Viewer" && (
                  <div>
                    <ul className="text-xs flex flex-col gap-3 text-[rgb(51,51,51)] p-4">
                      <li onClick={() => setMenuOpen(false)}>
                        <NavLink>ListYourShow</NavLink>
                      </li>
                      <li onClick={() => setMenuOpen(false)}>
                        <NavLink>Offers</NavLink>
                      </li>
                      <li onClick={() => setMenuOpen(false)}>
                        <NavLink>Gift Cards</NavLink>
                      </li>
                      <li onClick={() => setMenuOpen(false)}>
                        <NavLink to="/book/transactions">Transactions</NavLink>
                      </li>
                    </ul>
                  </div>
                )}

                {user?.accountType === "Admin" && (
                  <div>
                    <ul className="text-xs flex flex-col gap-3 text-[rgb(51,51,51)] p-4">
                      <li onClick={() => setMenuOpen(false)}>
                        <NavLink to="/cinema/addCinema">Add Cinema</NavLink>
                      </li>
                      <li onClick={() => setMenuOpen(false)}>
                        <NavLink to="/cinema/adminCinemas">
                          Update Screen
                        </NavLink>
                      </li>
                      <li onClick={() => setMenuOpen(false)}>
                        <NavLink to="/show/liveYourShow">Live Show</NavLink>
                      </li>
                    </ul>
                  </div>
                )}

                {user?.accountType === "SuperAdmin" && (
                  <div>
                    <ul className="text-xs flex flex-col gap-3 text-[rgb(51,51,51)] p-4">
                      <li onClick={() => setMenuOpen(false)}>
                        <NavLink to="/movie/addMovie">Add Movie</NavLink>
                      </li>
                      <li onClick={() => setMenuOpen(false)}>
                        <NavLink to="/addCity">Add City</NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import React, { useContext, useEffect, useRef, useState } from "react";
import plantImage from "../../assets/bg.png";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from './../AuthContext/AuthContext';
import { FaBars } from "react-icons/fa";
import ToggleTheme from './../ToggleTheme/ToggleTheme';
import MyProfile from './../../Page/MyProfile/MyProfile';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setDropdownOpen(false)}
          className={({ isActive }) =>
            `m-1 px-2 py-1 rounded transition-colors duration-300
            ${
              isActive
                ? "bg-green-600 font-bold text-white"
                : " font-bold text-gray-600 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-plants"
          onClick={() => setDropdownOpen(false)}
          className={({ isActive }) =>
            `m-1 px-2 py-1 rounded transition-colors duration-300
            ${
              isActive
                ? "bg-green-600 font-bold text-white"
                : " font-bold text-gray-600 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400"
            }`
          }
        >
          All Plants
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-plant"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `m-1 px-2 py-1 rounded transition-colors duration-300
                ${
                  isActive
                    ? "bg-green-600 font-bold text-white"
                    : " font-bold text-gray-600 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400"
                }`
              }
            >
              Add Plant
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-plants"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `m-1 px-2 py-1 rounded transition-colors duration-300
                ${
                  isActive
                    ? "bg-green-600 font-bold text-white"
                    : " font-bold text-gray-600 dark:text-green-300 hover:text-green-600 dark:hover:text-green-400"
                }`
              }
            >
              My Plants
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar mt-1 bg-green-50 border-green-200 dark:bg-gray-900 dark:border-gray-700  dark:text-green-300 shadow-md px-4 md:px-12">
        <div className="navbar-start hidden lg:flex">
          <img src={plantImage} alt="Logo" className="w-10 h-10 rounded-full mr-2" />
          <span className="text-xl font-bold select-none">
            <span className="text-green-700 font-bold dark:text-green-400">Plant</span>
            <span className="text-gray-800 font-bold  dark:text-green-300">Care</span>
          </span>
        </div>

        <div className="lg:hidden navbar-start" ref={dropdownRef}>
          <div className="dropdown relative">
            <button
              className="btn btn-ghost btn-square text-green-700 dark:text-green-400"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Toggle menu"
            >
              <FaBars className="text-2xl" />
            </button>
            <ul
            className={`absolute top-12 z-50 w-52 p-2 rounded-lg shadow-lg transition-all duration-300 transform bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700
             ${dropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"} space-y-2`}
            >
            {navLinks}
            </ul>

          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">{navLinks}</ul>
        </div>

        <div className="navbar-end gap-2">
          <ToggleTheme />
          {user ? (
            <MyProfile user={user} />
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn btn-sm bg-green-700 hover:bg-green-800 font-bold text-white"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-sm bg-green-600 hover:bg-green-700 font-bold text-white"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

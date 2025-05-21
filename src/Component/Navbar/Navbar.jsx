import React, { useContext, useEffect, useRef, useState } from "react";
import plantImage from "../../assets/plant.jpg";
import { FaMoon, FaSun } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from './../AuthContext/AuthContext';
import { NavLink, useNavigate } from "react-router";
import MyProfile from './../../Page/MyProfile/MyProfile';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

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
            `m-1 px-2 py-1 rounded ${isActive ? "bg-green-500 text-white" : "text-gray-700 dark:text-white"}`
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
            `m-1 px-2 py-1 rounded ${isActive ? "bg-green-500 text-white" : "text-gray-700 dark:text-white"}`
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
                `m-1 px-2 py-1 rounded ${isActive ? "bg-green-500 text-white" : "text-gray-700 dark:text-white"}`
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
                `m-1 px-2 py-1 rounded ${isActive ? "bg-green-500 text-white" : "text-gray-700 dark:text-white"}`
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
      <div className="navbar bg-green-50 border-green-200 dark:bg-gray-900 dark:text-white shadow-md px-4 md:px-12">

        <div className="navbar-start hidden lg:flex">
          <img src={plantImage} alt="Logo" className="w-10 h-10 rounded-full mr-2" />
          <span className="text-xl font-bold">
            <span className="text-green-600">Plant</span>
            <span className="text-gray-800 dark:text-white">Care</span>
          </span>
        </div>


        <div className="lg:hidden navbar-start" ref={dropdownRef}>
          <div className="dropdown relative">
            <button
              className="btn btn-ghost btn-square"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul
              className={`absolute top-12 right-[50] z-50 w-52 p-2 rounded-lg shadow transition-all duration-300 transform bg-base-100 dark:bg-gray-800${dropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                }`}
            >
              {navLinks}
            </ul>
          </div>
        </div>


        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">{navLinks}</ul>
        </div>


        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-sm" aria-label="Toggle Theme">
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          {user ? (
            <MyProfile user={user} />
          ) : (
            <>
              <NavLink to="/login" className="btn btn-sm bg-blue-600 text-white">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-sm bg-green-600 text-white">
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

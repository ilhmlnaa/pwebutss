import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    sessionStorage.removeItem("jwt_token");
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.length < 8 || searchQuery.length > 8) {
      toast.error("NPM must be 8 digits", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (searchQuery) {
      navigate(`/search?npm=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="z-50 h-20 text-center bg-gradient-to-l from-red-300 to-purple-400 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex gap-2 items-center text-xl font-bold">
          <img
            src="gundar.png"
            alt="Gunadarma Logo"
            className="w-12 h-12 object-cover"
          />
          <a href="https://gunadarma.ac.id" className="text-white">
            Gunadarma
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {/* Search input for mobile */}
          <form onSubmit={handleSearchSubmit}>
            <input
              type="number"
              placeholder="Search by NPM ..."
              className="p-2 rounded-lg bg-white text-slate-800 text-center w-36"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Search input for larger screens */}
        <div className="hidden md:block w-1/3">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="number"
              placeholder="Search by NPM ..."
              className="p-2 rounded-lg w-full text-slate-800 text-center bg-white "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <nav className="hidden md:flex md:items-center space-x-4">
          <a href="#home" className="hover:text-gray-200">
            Home
          </a>
          <button
            onClick={handleLogout}
            className="hover:text-gray-200 bg-blue-300 rounded-lg p-2 hover:bg-blue-400"
          >
            LogOut
          </button>
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-l from-red-300 to-purple-400 text-white p-4 space-y-4">
          <a href="#home" className="block hover:text-gray-200">
            Home
          </a>
          <button
            onClick={handleLogout}
            className="block hover:text-gray-200 bg-blue-300 rounded-lg p-2 hover:bg-blue-400 w-full"
          >
            LogOut
          </button>
          <ThemeToggle />
        </div>
      )}

      <ToastContainer />
    </header>
  );
};

export default Navbar;

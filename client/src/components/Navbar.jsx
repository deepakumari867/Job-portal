import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="shadow py-4 bg-white sticky top-0 z-50">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            // If user is logged in
            <div className="flex items-center gap-4">
              <Link
                to="/applications"
                className="text-gray-700 hover:text-blue-600"
              >
                Applied Jobs
              </Link>
              <span className="text-gray-400">|</span>
              <p className="text-gray-800 font-medium">
                Hi, {user.firstName} {user.lastName}
              </p>
              <UserButton />
            </div>
          ) : (
            // If user is not logged in
            <div className="flex items-center gap-4">
              {/* Recruiter Login always visible */}
              <button
                onClick={() => openSignIn({ redirectUrl: "/recruiter-dashboard" })}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Recruiter Login
              </button>

              {/* Normal User Login */}
              <button
                onClick={openSignIn}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
              >
                Login
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white shadow">
          {user ? (
            <div className="flex flex-col gap-3">
              <Link to="/applications" className="text-gray-700">
                Applied Jobs
              </Link>
              <p className="text-gray-800 font-medium">
                Hi, {user.firstName} {user.lastName}
              </p>
              <UserButton />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Recruiter Login always visible */}
              <button
                onClick={() => openSignIn({ redirectUrl: "/recruiter-dashboard" })}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Recruiter Login
              </button>

              {/* Normal User Login */}
              <button
                onClick={openSignIn}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

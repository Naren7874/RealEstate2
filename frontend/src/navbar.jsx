import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = true;
  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleProfileClick = () => {
    navigate('/profile'); // Redirect to the profile page
  };

  return (
    <nav className="navbar bg-white h-[100px] flex items-center justify-between shadow-sm pr-6">
      {/* Left Section */}
      <div className="left flex items-center gap-10 flex-3">
        <a href="/" className="logo flex items-center gap-3 font-bold text-lg">
          <img src="/logo.png" alt="Logo" className="w-6" />
          <span className="hidden md:inline">RealEstate</span>
        </a>
        <a href="/" className="hidden sm:inline text-black text-lg hover:scale-105 transition-transform">
          Home
        </a>
        <a href="/" className="hidden sm:inline text-black text-lg hover:scale-105 transition-transform">
          About
        </a>
        <a href="/" className="hidden sm:inline text-black text-lg hover:scale-105 transition-transform">
          Contact
        </a>
        <a href="/" className="hidden sm:inline text-black text-lg hover:scale-105 transition-transform">
          Agents
        </a>
      </div>

      {/* Right Section */}
      <div className="right flex items-center justify-end gap-6 flex-2">
        {user ? (
          <div
            className="user flex items-center font-bold gap-4 cursor-pointer"
            onClick={handleProfileClick} // Redirect on click
          >
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover transition-transform hover:scale-105"
            />
            <span className="hidden sm:inline text-lg">naren</span>
          </div>
        ) : (
          <>
            <a href="/login" className="hidden sm:inline text-black text-lg hover:scale-105 transition-transform">
              Sign in
            </a>
            <a href="/register" className="register bg-yellow-400 px-4 py-2 rounded-md text-black text-lg">
              Sign up
            </a>
          </>
        )}

        {/* Menu Icon */}
        <div className="menuicon sm:hidden">
          <img
            src="/menu.png"
            alt="Menu Icon"
            className="w-8 cursor-pointer transition-transform hover:scale-105"
            onClick={handleMenuToggle}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`menu fixed top-0 right-0 bg-black text-white h-screen w-2/3 flex flex-col items-center justify-center gap-6 transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-500 ease-in-out sm:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-5 text-white text-2xl font-bold"
          onClick={handleMenuToggle}
        >
          ✕
        </button>
        <a
          href="/"
          className="text-2xl hover:underline transition-transform hover:scale-105"
          onClick={handleMenuToggle}
        >
          Home
        </a>
        <a
          href="/"
          className="text-2xl hover:underline transition-transform hover:scale-105"
          onClick={handleMenuToggle}
        >
          About
        </a>
        <a
          href="/"
          className="text-2xl hover:underline transition-transform hover:scale-105"
          onClick={handleMenuToggle}
        >
          Contact
        </a>
        <a
          href="/"
          className="text-2xl hover:underline transition-transform hover:scale-105"
          onClick={handleMenuToggle}
        >
          Agents
        </a>
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-2xl hover:underline transition-transform hover:scale-105"
              onClick={handleMenuToggle}
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="text-2xl hover:underline transition-transform hover:scale-105"
              onClick={handleMenuToggle}
            >
              Sign up
            </Link>
          </>
        ) : 
        <a
          href="/"
          className="text-2xl hover:underline transition-transform hover:scale-105"
          onClick={handleMenuToggle}
        >
          Profile
        </a>
        }
      </div>
    </nav>
  );
};

export default Navbar;
import React, {useState} from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navLinkClass = ({isActive}) =>
    `px-2 py-2 flex items-center  ${
      isActive ? "text-orange-600" : "text-gray-800 hover:text-orange-500"
    } transition-colors duration-200`;

  return (
    <div className="w-full h-16 px-4 flex justify-between items-center bg-white shadow-md sticky top-0 z-50">
      <div className="text-[#FF6D00] text-2xl font-bold">ToolCrate</div>

      <button
        className="md:hidden text-2xl text-gray-800"
        onClick={() => setShowMenu((prev) => !prev)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul
        className={`absolute right-4 top-16 bg-white rounded-md shadow-md px-4 py-3 md:shadow-none md:bg-transparent md:static md:flex md:flex-row md:items-center flex flex-col  md:gap-10 ${
          showMenu ? "flex" : "hidden"
        }`}
      >
        <li>
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="link-to-qr" className={navLinkClass}>
            Link To QR Code
          </NavLink>
        </li>
        <li>
          <NavLink to="url-shortner" className={navLinkClass}>
            URL Shortener
          </NavLink>
        </li>
        <li className="flex justify-center items-center mt-2 md:mt-0 md:ml-2">
          <button className="bg-[#5A189A] hover:bg-[#4A148C] md:border-[2px] md:border-solid md:border-purple-900 md:hover:text-white md:font-medium md:bg-white md:text-purple-900 text-white rounded px-4 py-1 w-full">
            Sign-In
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;

import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const navLinks = (
    <>
      <NavLink to={"/"}>
        <a>Home</a>
      </NavLink>
      <NavLink to={"/rooms"}>
        <a>Rooms</a>
      </NavLink>
      <NavLink to={"/myBookings"}>
        <a>My Bookings</a>
      </NavLink>
      <NavLink to={"/aboutUs"}>
        <a>About Us</a>
      </NavLink>
      <NavLink to={"/contactUs"}>
        <a>Contact Us</a>
      </NavLink>
    </>
  );
  return (
    <div className="navbar max-w-7xl h-32 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to={"/"}
          className=" font-Playfair flex md:gap-2 items-center text-xl md:text-3xl font-extrabold"
        >
          <img src="/hotel-svg.svg" className="size-6 md:size-10" alt="" />{" "}
          <span className="text-blue-500 ">EASY</span>BOOK
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default NavBar;
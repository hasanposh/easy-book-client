import { Link, NavLink } from "react-router-dom";
import HoverButtun from "./HoverButtun";
import useAuth from "../hooks/useAuth";
import { Tooltip } from "react-tooltip";

const NavBar = () => {
  const { user, signOutUser } = useAuth();

  const handleSignOut = () => {
    signOutUser()
      .then((request) => {
        console.log(request.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navLinks = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 hover:text-blue-500"
            : " hover:text-blue-500"
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/rooms"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 hover:text-blue-500"
            : " hover:text-blue-500"
        }
      >
        Rooms
      </NavLink>
      {user && (
        <>
          <NavLink
            to={"/myBookings"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 hover:text-blue-500"
                : " hover:text-blue-500"
            }
          >
            My Bookings
          </NavLink>
          <NavLink
            to={"/myWishlist"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 hover:text-blue-500"
                : " hover:text-blue-500"
            }
          >
           My Wishlist
          </NavLink>
        </>
      )}
      <NavLink
        to={"/aboutUs"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 hover:text-blue-500"
            : " hover:text-blue-500"
        }
      >
        About Us
      </NavLink>
      <NavLink
        to={"/contactUs"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 hover:text-blue-500"
            : " hover:text-blue-500"
        }
      >
        Contact Us
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
        <ul className="menu menu-horizontal text-xl gap-5">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={user.displayName}
            >
              <div className="w-10 rounded-full">
                <Tooltip id="my-tooltip" />
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={handleSignOut}>Logout</a>
              </li>
            </ul>
          </div>
        )}
        {/* login button */}
        {!user && (
          <Link to={"/login"}>
            <div className="  hover:bg-slate-900 ">
              <HoverButtun>Sign In</HoverButtun>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;

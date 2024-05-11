import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";

const RegisterPage = () => {
  const { createUser, signOutUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const emailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{6,}$/;
    // console.log(name, photoURL, email, password)
    if (!emailValidate.test(email)) {
      toast("Invalid email address");
      return;
    }

    if (password.length < 6) {
      toast("Password must be at least 6 characters");
      return;
    }

    if (!passwordValidate.test(password)) {
      toast(
        "Password must contain at least one Uppercase and one Lowercase letter and one number."
      );
      return;
    }
    // console.log(name, photoURL, email, password);
    createUser(email, password)
      .then((request) => {
        const user = request.user;
        // updateProfile(user, { displayName: name, photoURL: photoURL }).then(
        //   () => {
        //     // console.log("Display name set successfully");
        //   }
        // );
        // // console.log(request.user);
        toast("Registered Successfully");
        signOutUser();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        // const errorMessage = error.message;
        const errorCode = error.code;
        toast(errorCode);
      });
  };

  return (
    <div className="flex w-full  mx-auto overflow-hidden bg-transparent rounded-lg shadow-lg  lg:max-w-7xl">
      <div className="hidden bg-cover lg:block lg:w-1/2 bg-center bg-[linear-gradient(45deg,rgba(0,0,0,0.6),rgba(0,0,0,0.3)),url('https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg')]"></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <img className="w-auto size-20" src="/hotel-svg.svg" alt="" />
        </div>

        <form action="" onSubmit={handleSignUp}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="LoggingEmailAddress"
            >
              Your Name
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              name="name"
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="LoggingEmailAddress"
            >
              Your Photo URL
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              name="photoURL"
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              name="email"
            />
          </div>

          <div className="mt-4 relative ">
            <div className="flex  justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="loggingPassword"
              >
                Password
              </label>
            </div>

            <input
              id="loggingPassword"
              className="block  w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type={showPassword ? "text" : "password"}
              name="password"
            />
          <div
            className="absolute text-white right-3 top-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          </div>
          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

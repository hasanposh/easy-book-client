import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../providers/AuthProvider";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(location);
    console.log(email, password);
    signInUser(email, password)
      .then((request) => {
        const loggedInUser = request.user;
        console.log(loggedInUser);
        const user = { email };
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              toast.success("Login Successful");
              navigate(location?.state ? location.state : "/");
              // navigate(location?.state ? location?.state : "/");
            }
          });

        // console.log(request.user);

        // console.log(location);
      })
      .catch((error) => {
        console.log(error);
        toast("Please Enter a Valid Email & Password");
      });
  };

  const handleGooglelogin = async () => {
    try {
      const result = await signInWithGoogle();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email: result?.user?.email },
        { withCredentials: true }
      );
      toast.success("Login Successful");
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      console.log(err);
      return toast.error(err?.message);
    }
  };
  // const handleGitHublogin = () => {
  //   signInWithGitHub();
  //   navigate(location?.state ? location.state : "/");
  // };
  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 rounded-lg shadow-md ">
      <Helmet>
        <title>Easy Book | Login</title>
        
      </Helmet>
      <div className="flex justify-center mx-auto">
        <img className="w-auto size-20 " src="/hotel-svg.svg" alt="" />
      </div>

      <form onSubmit={handleSignIn} className="mt-6">
        <div>
          <label htmlFor="username" className="block text-sm text-gray-800 ">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mt-4 relative ">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium "
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
          <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Sign In
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

        <a href="#" className="text-xs text-center  uppercase hover:underline">
          or login with Social Media
        </a>

        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
      </div>

      <div className="flex items-center mt-6 -mx-2">
        <button
          onClick={handleGooglelogin}
          type="button"
          className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
        >
          <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
          </svg>

          <span className="hidden mx-2 sm:inline">Sign in with Google</span>
        </button>

        <a
          href="#"
          className="p-2 mx-2 text-sm font-medium  transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
          </svg>
        </a>
      </div>

      <p className="mt-8 text-xs font-light text-center ">
        Dont have an account?
        <Link
          to={"/register"}
          className="font-medium text-black hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

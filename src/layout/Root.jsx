import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="font-Sora relative">
      {/* navbar */}
      <NavBar className="z-10" />
      <img
        className="absolute w-full -z-50 top-0"
        src="/Animated Shape.svg"
        alt=""
      />

      {/* outlet */}
      <Outlet />
      {/* footer */}
      <Footer/>
      <img
        className="absolute w-full -z-50 rotate-180 bottom-0"
        src="/Animated Shape.svg"
        alt=""
      />
    </div>
  );
};

export default Root;

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
// import LoadingPage from "../components/LoadingPage";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <progress className="progress w-56"></progress>
  }

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"} />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.any,
};
export default PrivateRoutes;
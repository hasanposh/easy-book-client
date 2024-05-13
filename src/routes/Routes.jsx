import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import RoomsPage from "../pages/RoomsPage";
import HomePage from "../pages/HomePage";
import MyBookingsPage from "../pages/MyBookingsPage";
import AboutUsPage from "../pages/AboutUsPage";
import ContactUsPage from "../pages/ContactUsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoutes from "./PrivateRoutes";
import RoomDetails from "../pages/RoomDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/rooms",
        element: <RoomsPage />,
      },
      {
        path: "/myBookings",
        element: (
          <PrivateRoutes>
            <MyBookingsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/aboutUs",
        element: <AboutUsPage />,
      },
      {
        path: "/contactUs",
        element: <ContactUsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/rooms/:id",
        element: <RoomDetails />,
        loader: ({params})=> fetch(`http://localhost:5000/rooms/${params.id}`)
      },
    ],
  },
]);

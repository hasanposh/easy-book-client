import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import RoomsPage from "../pages/RoomsPage";
import HomePage from "../pages/HomePage";
import MyBookingsPage from "../pages/MyBookingsPage";
import AboutUsPage from "../pages/AboutUsPage";
import ContactUsPage from "../pages/ContactUsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
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
        element: <MyBookingsPage />,
      },
      {
        path: "/aboutUs",
        element: <AboutUsPage />,
      },
      {
        path: "/contactUs",
        element: <ContactUsPage />,
      },
    ],
  },
]);

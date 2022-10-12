import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./components/ErrorPage";
import BookingPage, {
  loader as bookingPageDataLoader,
} from "./pages/BookingPage";
import LandingPage, {
  loader as landingPageDataLoader,
} from "./pages/LandingPage";
import PropertyDetailsPage, {
  loader as propertyDataLoader,
} from "./pages/PropertyDetailsPage";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: landingPageDataLoader,
      },
      {
        path: "/properties/:id",
        children: [
          {
            index: true,
            element: <PropertyDetailsPage />,
            loader: propertyDataLoader,
          },
          {
            path: "book",
            element: <BookingPage />,
            loader: bookingPageDataLoader,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

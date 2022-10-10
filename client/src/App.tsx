import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import BookingPage, {
  loader as bookingPageDataLoader,
} from "./pages/BookingPage";
import LandingPage, {
  loader as landingPageDataLoader,
} from "./pages/LandingPage";
import PropertyDetailPage, {
  loader as propertyDataLoader,
} from "./pages/PropertyDetailPage";

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
            element: <PropertyDetailPage />,
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
  return <RouterProvider router={router} />;
}

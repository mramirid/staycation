import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { BookingPage } from "./features/booking";
import { landingLoader, LandingPage } from "./features/landing-page";
import { PropertyDetailsPage } from "./features/property-details";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: landingLoader,
      },
      {
        path: "/properties/:id",
        children: [
          {
            index: true,
            element: <PropertyDetailsPage />,
          },
          {
            path: "book",
            element: <BookingPage />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

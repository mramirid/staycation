import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import BookingPage from "./pages/BookingPage";
import LandingPage, { loader as landingLoader } from "./pages/LandingPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";

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
            element: <PropertyDetailPage />,
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

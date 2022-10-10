import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import BookingPage from "./pages/BookingPage";
import LandingPage, { loader as landingPageLoader } from "./pages/LandingPage";
import PropertyDetailPage, {
  loader as propertyDetailLoader,
} from "./pages/PropertyDetailPage";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: landingPageLoader,
      },
      {
        path: "/properties/:id",
        children: [
          {
            index: true,
            element: <PropertyDetailPage />,
            loader: propertyDetailLoader,
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

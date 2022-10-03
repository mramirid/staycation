import { Route, Routes } from "react-router-dom";
import { BookingPage } from "./features/booking";
import { LandingPage } from "./features/landing-page";
import { PropertyDetailsPage } from "./features/property-details";

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/properties/:id" element={<PropertyDetailsPage />} />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  );
}

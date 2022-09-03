import { Route, Routes } from "react-router-dom";
import { DetailPropertyPage } from "./features/detail-property";
import { LandingPage } from "./features/landing-page";

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/properties/:id" element={<DetailPropertyPage />} />
    </Routes>
  );
}

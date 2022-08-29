import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./features/landing-page";

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
    </Routes>
  );
}

import { Route, Routes } from "react-router-dom";
import { Breadcrumbs, DetailPropertyPage } from "./features/detail-property";
import { LandingPage } from "./features/landing-page";

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/properties/:id" element={<DetailPropertyPage />} />
      <Route path="/tests/breadcrumbs" element={<TestBreadcrumbs />} />
    </Routes>
  );
}

function TestBreadcrumbs() {
  return (
    <Breadcrumbs
      data={[
        { label: "Home", to: "/" },
        { label: "House Details", to: "/tests/breadcrumbs" },
      ]}
    />
  );
}

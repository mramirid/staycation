import { render } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Breadcrumbs, { type BreadcrumbsData } from "./Breadcrumbs";

function setup() {
  const breadcrumbsData: BreadcrumbsData = [
    { label: "Home", to: "/" },
    { label: "House Details", to: "/house/1" },
  ];

  const { container } = render(
    <BrowserRouter>
      <Routes>
        <Route index element={<Breadcrumbs data={breadcrumbsData} />} />
      </Routes>
    </BrowserRouter>
  );

  const breadcrumbs = container.querySelector(".breadcrumbs");
  return breadcrumbs;
}

describe("<Breadcrumbs />", () => {
  it("Should match with the snapshot", () => {
    const breadcrumbs = setup();

    expect(breadcrumbs).toMatchSnapshot();
  });

  it("Should have <ol> with className .breadcrumbs and have text Home & House Details", () => {
    const breadcrumbs = setup();

    expect(breadcrumbs).toBeInTheDocument();
    expect(breadcrumbs).toHaveTextContent("Home");
    expect(breadcrumbs).toHaveTextContent("House Details");
  });
});

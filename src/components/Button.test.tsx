import { render } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Button from "./Button";

describe("<Button />", () => {
  it("Should not allowed click button if isDisabled is present", () => {
    const { container } = render(
      <Button kind="button" isDisabled>
        A
      </Button>
    );
    expect(container.querySelector("button.btn-disabled")).toBeInTheDocument();
  });

  it("Should render loading/spinner", () => {
    const { container } = render(
      <Button kind="button" isLoading>
        A
      </Button>
    );

    expect(container.querySelector(".loading")).toBeInTheDocument();
  });

  it("Should render <a />", () => {
    const { container } = render(
      <Button kind="external-link" href="#">
        A
      </Button>
    );

    expect(container.querySelector("a")).toBeInTheDocument();
  });

  it("Should render <Link /> from react-router-dom", () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Button kind="link" to="#">
                A
              </Button>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    expect(container.querySelector("a")).toBeInTheDocument();
  });
});

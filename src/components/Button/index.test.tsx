import { render } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Button from ".";

describe("<Button />", () => {
  it("Should not allowed click button if isDisabled is present", () => {
    const { container } = render(<Button isDisabled>A</Button>);
    expect(container.querySelector("button.disabled")).toBeInTheDocument();
  });

  it("Should render loading/spinner", () => {
    const { container, getByText } = render(<Button isLoading>A</Button>);

    expect(getByText(/loading/i)).toBeInTheDocument();
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("Should render <a />", () => {
    const { container } = render(
      <Button isLink isExternal href="#">
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
              <Button isLink href="#">
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

import { fireEvent, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { useState } from "react";
import InputNumber from "./InputNumber";

function Form() {
  const [value, setValue] = useState<number>(2);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <InputNumber
      id="test-input-number"
      value={value}
      min={1}
      suffix={{ value: "day", pluralValue: "days" }}
      onChange={handleChange}
    />
  );
}

describe("<InputNumber />", () => {
  it("Should match with the snapshot", () => {
    const { container } = render(<Form />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("Should able to change value", () => {
    render(<Form />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: 50 } });

    expect(input.value).toBe("50 days");
  });

  it("Should not be able to change when it has reached the mininmum value", () => {
    render(<Form />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: 0 } });

    expect(input.value).toBe("2 days");
  });

  it("Should increment when the plus button is pressed", async () => {
    render(<Form />);

    const plusButton = screen.getByTestId("btn-plus") as HTMLButtonElement;
    await UserEvent.click(plusButton);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("3 days");
  });

  it("Should decrement when the minus button is pressed", async () => {
    render(<Form />);

    const plusButton = screen.getByTestId("btn-minus") as HTMLButtonElement;
    await UserEvent.click(plusButton);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("1 day");
  });
});

import { render, screen } from "@testing-library/react";
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
      suffix={{ singular: "day", plural: "days" }}
      onChange={handleChange}
    />
  );
}

describe("<InputNumber />", () => {
  it("Should match with the snapshot", () => {
    const { container } = render(<Form />);
    expect(container.firstChild).toMatchSnapshot();
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

    const minusButton = screen.getByTestId("btn-minus") as HTMLButtonElement;
    await UserEvent.click(minusButton);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("1 day");
  });

  it("Should not be able to decrement when it has reached the mininmum value", async () => {
    render(<Form />);

    const minusButton = screen.getByTestId("btn-minus") as HTMLButtonElement;
    await Promise.all([
      UserEvent.click(minusButton),
      UserEvent.click(minusButton),
    ]);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("1 day");
  });
});

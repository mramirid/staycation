import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { useState } from "react";
import { type Range } from "react-date-range";
import InputDateRange, { addDays } from "./InputDateRange";

function Form() {
  const [value, setValue] = useState<Range>({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  });

  const handleChange = (newValue: Range) => {
    setValue(newValue);
  };

  return (
    <InputDateRange name="test-input" value={value} onChange={handleChange} />
  );
}

describe("<InputDateRange />", () => {
  it("Should show date picker when click input field", async () => {
    const { container } = render(<Form />);

    const textBox = screen.getByRole("textbox") as HTMLInputElement;
    await UserEvent.click(textBox);

    const dateRange = container.querySelector(".rdrCalendarWrapper");
    expect(dateRange).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { addDays } from "date-fns";
import { useState } from "react";
import { type Range } from "react-date-range";
import InputDateRange from "./InputDateRange";

const AUGUST_31_2022 = new Date(2022, 7, 31);

function Form() {
  const [value, setValue] = useState<Range>({
    startDate: AUGUST_31_2022,
    endDate: addDays(AUGUST_31_2022, 7),
    key: "selection",
  });

  const handleChange = (newValue: Range) => {
    setValue(newValue);
  };

  return (
    <InputDateRange
      id="test-input-date"
      value={value}
      onChange={handleChange}
    />
  );
}

describe("<InputDateRange />", () => {
  it("Should match with the snapshot", () => {
    const { container } = render(<Form />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("Should show date picker when click input field", async () => {
    const { container } = render(<Form />);

    const textBox = screen.getByRole("textbox") as HTMLInputElement;
    await UserEvent.click(textBox);

    const dateRange = container.querySelector(".rdrCalendarWrapper");
    expect(dateRange).toBeInTheDocument();
  });
});

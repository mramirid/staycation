import TitledSection from "@/components/TitledSection";
import { formatToUSD } from "@/utils/format";
import { clx } from "@/utils/styling";
import { addDays, differenceInDays } from "date-fns";
import { isDate } from "lodash-es";
import { useState, type FormEvent } from "react";
import { type Range } from "react-date-range";
import type { Property } from "../types";
import classes from "./BookingForm.module.scss";
import InputDateRange from "./InputDateRange";
import InputNumber from "./InputNumber";

type Props = {
  className: string;
  property: Property;
};

export default function BookingForm(props: Props) {
  const formattedPrice = formatToUSD(props.property.price);

  return (
    <TitledSection
      title="Start Booking"
      sectionClass={clx(
        "card self-start border border-base-200 px-[5.25rem] py-[3.875rem]",
        props.className
      )}
      titleClass="mb-14px"
    >
      <h5 className="font-medium text-4xl text-success">
        {formattedPrice}{" "}
        <span className="text-base-300 font-extralight">
          per {props.property.unit}
        </span>
      </h5>

      <Form className="mt-14px" property={props.property} />
    </TitledSection>
  );
}

function Form({ className, property }: Props) {
  const today = new Date();
  const [nights, setNights] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: today,
    endDate: addDays(today, nights - 1),
    key: "selection",
  });

  const updateNights = (newNights: number) => {
    if (isDate(dateRange.startDate)) {
      const newEndDate = addDays(dateRange.startDate, newNights - 1);
      setDateRange({ ...dateRange, endDate: newEndDate });
    }
    setNights(newNights);
  };

  const updateDateRange = (newRange: Range) => {
    if (isDate(newRange.endDate) && isDate(newRange.startDate)) {
      const daysDiff = differenceInDays(newRange.endDate, newRange.startDate);
      setNights(daysDiff + 1);
    }
    setDateRange(newRange);
  };

  const startBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Booking...");
  };

  const totalPrice = formatToUSD(property.price * nights);

  return (
    <form className={className} onSubmit={startBooking}>
      <label htmlFor="nights" className={classes.form__label}>
        How long you will stay?
      </label>
      <InputNumber
        id="nights"
        value={nights}
        suffix={{ value: "night", pluralValue: "nights" }}
        min={1}
        onChange={updateNights}
      />

      <label htmlFor="date-range" className={clx(classes.form__label, "mt-6")}>
        Pick a Date
      </label>
      <InputDateRange
        id="date-range"
        value={dateRange}
        minDate={today}
        onChange={updateDateRange}
      />

      <h6 className="text-light mt-14px">
        You will pay <b className="text-semibold">{totalPrice}</b> per{" "}
        <b className="text-semibold">{nights} nights</b>
      </h6>

      <button className="app-btn app-btn-primary btn-block mt-10" type="submit">
        Continue to Book
      </button>
    </form>
  );
}

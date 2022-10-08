import TitledSection from "@/components/TitledSection";
import type { StartBookingData } from "@/features/booking";
import { formatToUSD } from "@/utils/format";
import { clx } from "@/utils/styling";
import { addDays, differenceInDays } from "date-fns";
import { isUndefined } from "lodash-es";
import { useState, type FormEvent } from "react";
import { type Range } from "react-date-range";
import { useNavigate } from "react-router-dom";
import type { Property } from "../../types";
import InputDateRange from "./InputDateRange";
import InputNumber from "./InputNumber";

type BookingFormProps = {
  className: string;
  property: Property;
};

export default function StartBookingForm(props: BookingFormProps) {
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

type DateRange = Required<Pick<Range, "startDate" | "endDate" | "key">>;

function Form({ className, property }: BookingFormProps) {
  const today = new Date();
  const [duration, setDuration] = useState<number>(1);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: today,
    endDate: addDays(today, duration - 1),
    key: "selection",
  });

  const updateDuration = (newDuration: number) => {
    const newEndDate = addDays(dateRange.startDate, newDuration - 1);
    setDateRange({ ...dateRange, endDate: newEndDate });
    setDuration(newDuration);
  };

  const updateDateRange = (newRange: Range) => {
    if (
      isUndefined(newRange.startDate) ||
      isUndefined(newRange.endDate) ||
      isUndefined(newRange.key)
    ) {
      return;
    }

    const daysDiff = differenceInDays(newRange.endDate, newRange.startDate);
    setDuration(daysDiff + 1);
    setDateRange({
      startDate: newRange.startDate,
      endDate: newRange.endDate,
      key: newRange.key,
    });
  };

  const navigate = useNavigate();

  const handleStartBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startBookingData: StartBookingData = {
      duration,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    };
    navigate("book", { state: { startBookingData } });
  };

  const totalPrice = formatToUSD(property.price * duration);

  return (
    <form className={className} onSubmit={handleStartBooking}>
      <label htmlFor="duration" className="block mb-2 leading-7 text-secondary">
        How long you will stay?
      </label>
      <InputNumber
        id="duration"
        value={duration}
        suffix={{ singular: "night", plural: "nights" }}
        min={1}
        onChange={updateDuration}
      />

      <label
        htmlFor="date-range"
        className="block mb-2 leading-7 text-secondary mt-6"
      >
        Pick a Date
      </label>
      <InputDateRange
        id="date-range"
        value={dateRange}
        minDate={today}
        onChange={updateDateRange}
      />

      <h6 className="text-light mt-14px">
        You will pay <b className="text-semibold">{totalPrice}</b>
        {" per "}
        <b className="text-semibold">{duration} nights</b>
      </h6>

      <button className="app-btn app-btn-primary btn-block mt-10" type="submit">
        Continue to Book
      </button>
    </form>
  );
}

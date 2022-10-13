import InputDateRange from "@/components/forms/InputDateRange";
import InputNumber from "@/components/forms/InputNumber";
import TitledSection from "@/components/TitledSection";
import type { StatefulNavigate } from "@/types/react-router";
import { formatToUSD } from "@/utils/format";
import { clx } from "@/utils/styling";
import { addDays, differenceInDays } from "date-fns";
import { isUndefined } from "lodash-es";
import { useState, type FormEvent } from "react";
import { type Range } from "react-date-range";
import { useNavigate, useNavigation } from "react-router-dom";

type BookingFormProps = {
  className: string;
  propertyPrice: number;
  propertyUnit: string;
};

export default function StartBookingForm(props: BookingFormProps) {
  const formattedPrice = formatToUSD(props.propertyPrice);

  return (
    <TitledSection
      title="Start Booking"
      sectionClass={clx(
        "card self-start border border-base-200 p-16 sm:px-[5.25rem] sm:py-[3.875rem]",
        props.className
      )}
      titleClass="mb-14px"
    >
      <h5 className="font-medium text-4xl text-success">
        {formattedPrice}
        &nbsp;
        <span className="text-base-300 font-extralight">
          per {props.propertyUnit}
        </span>
      </h5>

      <Form className="mt-14px" propertyPrice={props.propertyPrice} />
    </TitledSection>
  );
}

type DateRange = Required<Pick<Range, "startDate" | "endDate" | "key">>;

type FormProps = {
  className: string;
  propertyPrice: number;
};

function Form({ className, propertyPrice }: FormProps) {
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

  const navigation = useNavigation();
  const navigate = useNavigate() as StatefulNavigate<BookingLocationState>;

  const handleStartBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("book", {
      state: {
        startBookingData: {
          duration,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      },
    });
  };

  const totalPrice = formatToUSD(propertyPrice * duration);

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

      <button
        className={clx("app-btn app-btn-primary btn-block mt-10", {
          loading: navigation.state === "loading",
        })}
        type="submit"
      >
        Continue to Book
      </button>
    </form>
  );
}

export type BookingLocationState = {
  startBookingData: StartBookingData;
};

type StartBookingData = {
  duration: number;
  startDate: Date;
  endDate: Date;
};

import { clx } from "@/utils/styling";
import { isDate } from "lodash-es";
import { useEffect, useRef, useState } from "react";
import {
  DateRange,
  type Range,
  type RangeFocus,
  type RangeKeyDict,
} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ReactComponent as IconCalendar } from "../assets/icons/calendar.svg";

type Props = {
  className?: string;
  value?: Range;
  minDate?: Date;
  name: string;
  onChange: (range: Range) => void;
};

export default function InputDateRange(props: Props) {
  const value: Range = props.value ?? {
    startDate: new Date(),
    endDate: addDays(new Date(), 7), // until next week
    key: "selection",
  };

  const [isShowed, setIsShowed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    assertIsNode(event.target);
    setIsShowed(!!containerRef?.current?.contains(event.target));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const startDate = isDate(value.startDate) ? formatDate(value.startDate) : "";
  const endDate = isDate(value.endDate)
    ? " - " + formatDate(value.endDate)
    : "";

  const datePickerChange = (rangesByKey: RangeKeyDict) => {
    props.onChange(rangesByKey.selection);
  };

  const check = (rangeFocus: RangeFocus) => {
    setIsShowed(rangeFocus.indexOf(1) !== -1);
  };

  return (
    <div ref={containerRef}>
      <div className={clx("app-input-group", props.className)}>
        <span className="side !bg-secondary !rounded-l cursor-pointer">
          <IconCalendar className="h-[1.563rem] aspect-square" />
        </span>
        <input
          readOnly
          type="text"
          name={props.name}
          className="textbox cursor-pointer"
          value={startDate + endDate}
        />
      </div>

      {isShowed && (
        <DateRange
          className="p-1 bg-white drop-shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded"
          ranges={[value]}
          minDate={props.minDate}
          onChange={datePickerChange}
          editableDateInputs
          moveRangeOnFirstSelection={false}
          onRangeFocusChange={check}
        />
      )}
    </div>
  );
}

export function addDays(date: Date, number: number) {
  const newDate = new Date(date);
  return new Date(newDate.setDate(newDate.getDate() + number));
}

/**
 * A type assertion function to assert that target is a Node.
 *
 * Reference:
 * https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t
 */
function assertIsNode(target: EventTarget | null): asserts target is Node {
  if (!target || !("nodeType" in target)) {
    throw new Error("Node expected");
  }
}

function formatDate(date: Date) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const [{ value: month }, , { value: dateOfMonth }] =
    dateFormatter.formatToParts(date);

  return `${dateOfMonth} ${month}`;
}

import { ReactComponent as IconCalendar } from "@/assets/icons/calendar.svg";
import { clx } from "@/utils/styling";
import { isDate, isUndefined } from "lodash-es";
import { useEffect, useRef, useState } from "react";
import {
  DateRange,
  type Range,
  type RangeFocus,
  type RangeKeyDict,
} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import classes from "./input-group.module.scss";

type Props = {
  id: string;
  value: Range;
  minDate?: Date;
  onChange: (range: Range) => void;
};

export default function InputDateRange(props: Props) {
  if (isUndefined(props.value)) {
    throw new TypeError("Please provide the initial value");
  }

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

  const startDate = isDate(props.value.startDate)
    ? formatDate(props.value.startDate)
    : "";
  const endDate = isDate(props.value.endDate)
    ? " - " + formatDate(props.value.endDate)
    : "";

  const datePickerChange = (rangesByKey: RangeKeyDict) => {
    props.onChange(rangesByKey.selection);
  };

  const check = (rangeFocus: RangeFocus) => {
    setIsShowed(rangeFocus.indexOf(1) !== -1);
  };

  return (
    <div ref={containerRef}>
      <div className={classes.inputGroup}>
        <span
          className={clx(
            classes.inputGroup__sideIcon,
            "!bg-secondary !rounded-l cursor-pointer"
          )}
        >
          <IconCalendar className="h-[1.563rem] aspect-square" />
        </span>
        <input
          id={props.id}
          readOnly
          type="text"
          placeholder="Pick a date range..."
          className={clx(classes.inputGroup__textInput, "cursor-pointer")}
          value={startDate + endDate}
        />
      </div>

      {isShowed && (
        <DateRange
          className="p-1 bg-white drop-shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded"
          ranges={[props.value]}
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

/**
 * A type assertion function to assert that target is a Node.
 *
 * Reference:
 * https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t
 */
function assertIsNode(target: EventTarget | null): asserts target is Node {
  if (!target || !("nodeType" in target)) {
    throw new TypeError("Node expected");
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

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
  value: Range;
  placeholder: string;
  name: string;
  onChange: (range: Range) => void;
};

export default function InputDateRange(props: Props) {
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
        <div className="date-range-wrapper">
          <DateRange
            editableDateInputs={true}
            onChange={datePickerChange}
            moveRangeOnFirstSelection={false}
            onRangeFocusChange={check}
            ranges={[props.value]}
          />
        </div>
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

import { clx } from "@/utils/styling";
import { inRange, isString, isUndefined } from "lodash-es";
import { useState } from "react";
import classes from "./input-group.module.scss";

type Props = {
  className?: string;
  name: string;
  value?: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  suffix?: { value: string; pluralValue?: string };
};

export default function InputNumber({
  value = 1,
  min = 1,
  max = 1,
  ...props
}: Props) {
  if (!inRange(value, min, max + 1)) {
    throw new Error("The value is out of range. Check your min-max!");
  }

  const buildSuffix = (currentValue: number) => {
    const { suffix } = props;

    if (isUndefined(suffix)) {
      return "";
    }

    if (isString(suffix.pluralValue) && currentValue > 1) {
      return suffix.pluralValue;
    }
    return suffix.value;
  };

  const [inputValue, setInputValue] = useState(
    [value, buildSuffix(value)].join(" ")
  );

  const onChange = (newValue: string) => {
    const currentSuffix = buildSuffix(value);
    if (isString(currentSuffix)) {
      newValue = newValue.replace(currentSuffix, "");
    }

    const patternNumeric = new RegExp("[0-9]*");
    const isNumeric = patternNumeric.test(newValue);

    if (isNumeric && +newValue <= max && +newValue >= min) {
      props.onChange(+newValue);

      const newSuffix = buildSuffix(+newValue);
      setInputValue([newValue, newSuffix].join(" "));
    }
  };

  const hasReachedMin = value === min;
  const hasReachedMax = value === max;

  const minus = () => {
    if (hasReachedMin) return;
    onChange((value - 1).toString());
  };

  const plus = () => {
    if (hasReachedMax) return;
    onChange((value + 1).toString());
  };

  return (
    <div className={clx(classes.inputGroup, props.className)}>
      <button
        className={clx(
          classes.inputGroup__sideIcon,
          "btn btn-error !rounded-l"
        )}
        type="button"
        disabled={hasReachedMin}
        onClick={minus}
        data-testid="btn-minus"
      >
        -
      </button>
      <input
        type="text"
        min={min}
        max={max}
        name={props.name}
        pattern="[0-9]*"
        className={classes.inputGroup__textInput}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className={clx(
          classes.inputGroup__sideIcon,
          "btn btn-success !rounded-r"
        )}
        type="button"
        disabled={hasReachedMax}
        onClick={plus}
        data-testid="btn-plus"
      >
        +
      </button>
    </div>
  );
}

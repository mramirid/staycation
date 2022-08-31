import { clx } from "@/utils/styling";
import { inRange, isString, isUndefined } from "lodash-es";
import { useState } from "react";

type Props = {
  className?: string;
  name: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  suffix?: { value: string; pluralValue?: string };
};

export default function InputNumber({ min = 1, max = 1, ...props }: Props) {
  if (!inRange(props.value, min, max + 1)) {
    throw new Error("The value is out of range");
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
    [props.value, buildSuffix(props.value)].join(" ")
  );

  const onChange = (newValue: string) => {
    const currentSuffix = buildSuffix(props.value);
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

  const hasReachedMin = props.value === min;
  const hasReachedMax = props.value === max;

  const minus = () => {
    if (hasReachedMin) return;
    onChange((props.value - 1).toString());
  };

  const plus = () => {
    if (hasReachedMax) return;
    onChange((props.value + 1).toString());
  };

  return (
    <div
      className={clx("input-group max-h-fit items-stretch", props.className)}
    >
      <button
        className="input-side-icon btn btn-error !rounded-l font-bold text-2xl h-full"
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
        className="bg-base-200 text-center focus:outline-none grow min-w-0"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="input-side-icon btn btn-success !rounded-r font-bold text-2xl h-full"
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

import { clx } from "@/utils/styling";
import { isString, isUndefined } from "lodash-es";
import classes from "./input-group.module.scss";

type Props = {
  id: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  suffix?: { value: string; pluralValue?: string };
};

export default function InputNumber({ min = 1, ...props }: Props) {
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

  const inputValue = [props.value, buildSuffix(props.value)].join(" ");

  const onChange = (newValue: string) => {
    const currentSuffix = buildSuffix(props.value);
    if (isString(currentSuffix)) {
      newValue = newValue.replace(currentSuffix, "");
    }

    const patternNumeric = new RegExp("[0-9]*");
    const isNumeric = patternNumeric.test(newValue);

    if (isNumeric && +newValue >= min) {
      props.onChange(+newValue);
    }
  };

  const hasReachedMin = props.value <= min;

  const minus = () => {
    if (hasReachedMin) return;
    props.onChange(props.value - 1);
  };

  const plus = () => {
    props.onChange(props.value + 1);
  };

  return (
    <div className={classes.inputGroup}>
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
        id={props.id}
        type="text"
        placeholder="Enter a number..."
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
        onClick={plus}
        data-testid="btn-plus"
      >
        +
      </button>
    </div>
  );
}

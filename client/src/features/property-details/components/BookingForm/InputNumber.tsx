import { formatCountSuffix, type Suffix } from "@/utils/format";
import { clx } from "@/utils/styling";
import classes from "./input-group.module.scss";

type Props = {
  id: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  suffix?: Suffix;
};

export default function InputNumber({ min = 1, ...props }: Props) {
  const inputValue = formatCountSuffix(props.value, props.suffix);

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
        readOnly
        id={props.id}
        type="text"
        placeholder="Enter a number..."
        className={classes.inputGroup__textInput}
        value={inputValue}
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

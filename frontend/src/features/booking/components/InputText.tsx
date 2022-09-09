import { isString } from "lodash-es";
import { forwardRef } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  containerClass?: string;
  errorMessage?: string;
  type: "email" | "tel" | "text";
};

const InputText = forwardRef<
  HTMLInputElement,
  Props & ReturnType<UseFormRegister<FieldValues>>
>((props, ref) => (
  <div className={props.containerClass}>
    <input
      className="input block h-45px w-full bg-base-200 text-secondary"
      type={props.type}
      ref={ref}
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder="Please type here ..."
    />
    {isString(props.errorMessage) && (
      <div className="mt-2 text-error text-sm">{props.errorMessage}</div>
    )}
  </div>
));

export default InputText;

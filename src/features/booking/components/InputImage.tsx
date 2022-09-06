import { clx } from "@/utils/styling";
import { isString } from "lodash-es";
import { forwardRef } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  accept: string[];
  containerClass?: string;
  errorMessage?: string;
};

const InputImage = forwardRef<
  HTMLInputElement,
  Props & ReturnType<UseFormRegister<FieldValues>>
>((props, ref) => {
  // const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   const files = e.target.files;
  //   if (isNull(files)) {
  //     return;
  //   }

  //   const image = files.item(0);
  //   if (isNull(image)) {
  //     return;
  //   }

  //   props.onChange(image);
  // };

  return (
    <div className={props.containerClass}>
      <label className="relative block min-h-fit">
        <input
          id={props.id}
          className="hidden"
          type="file"
          accept={props.accept.join()}
          ref={ref}
          name={props.name}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <span
          className={clx(
            "input cursor-pointer bg-base-200 text-gray-400",
            "flex h-full w-full items-center min-h-45px"
          )}
        >
          Choose a file...
        </span>
      </label>
      {isString(props.errorMessage) && (
        <div className="mt-1 text-error text-sm">{props.errorMessage}</div>
      )}
    </div>
  );
});

export default InputImage;

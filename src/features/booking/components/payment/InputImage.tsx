import { clx } from "@/utils/styling";
import { isNull, isString } from "lodash-es";
import { type ChangeEventHandler } from "react";

type Props = {
  id: string;
  name: string;
  value?: string;
  onChange: (image: File) => void;
  containerClass?: string;
  errorMessage?: string;
};

export default function InputImage(props: Props) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (isNull(files)) return;

    const image = files.item(0);
    if (isNull(image)) return;

    props.onChange(image);
  };

  return (
    <div className={props.containerClass}>
      <label className="relative block min-h-fit">
        <input
          id={props.id}
          className="hidden"
          type="file"
          accept="image/*"
          name={props.name}
          onChange={handleChange}
        />
        <div
          className={clx(
            "input cursor-pointer bg-base-200 text-gray-400",
            "flex h-full w-full items-center min-h-45px"
          )}
        >
          {isString(props.value) ? (
            <span className="line-clamp-1 text-secondary">{props.value}</span>
          ) : (
            <>Browse a file ...</>
          )}
        </div>
      </label>
      {isString(props.errorMessage) && (
        <div className="mt-2 text-error text-sm">{props.errorMessage}</div>
      )}
    </div>
  );
}

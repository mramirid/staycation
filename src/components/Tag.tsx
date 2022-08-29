import { clx } from "@/utils/styling";

type Props = {
  className: string;
  highlightedText: string;
  text: string;
};

export default function Tag(props: Props) {
  return (
    <div
      className={clx(
        "rounded-bl-2xl bg-accent w-[11.25rem] h-10 font-light",
        "text-white flex justify-center items-center",
        props.className
      )}
    >
      <b className="font-medium">{props.highlightedText}</b>&nbsp;{props.text}
    </div>
  );
}

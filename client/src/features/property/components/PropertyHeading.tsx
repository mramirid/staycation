import { clx } from "@/utils/styling";

type PropertyHeadingProps = {
  title: string;
  city: string;
  country: string;
  className: string;
};

export default function PropertyHeading(props: PropertyHeadingProps) {
  return (
    <section className={clx(props.className, "text-center")}>
      <h1 className="font-semibold text-4xl">{props.title}</h1>
      <span className="font-light text-lg block mt-1">
        {props.city},&nbsp;{props.country}
      </span>
    </section>
  );
}

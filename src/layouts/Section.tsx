import { clx } from "@/lib/styling";
import { forwardRef, type ReactElement } from "react";

type Props = {
  titleClass?: string;
  sectionClass?: string;
  title: string;
  children: ReactElement;
};

const Section = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <section ref={ref} className={props.sectionClass}>
    <h4
      className={clx(
        "font-medium text-2xl text-secondary mb-5",
        props.titleClass
      )}
    >
      {props.title}
    </h4>
    {props.children}
  </section>
));

export default Section;

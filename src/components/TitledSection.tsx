import { forwardRef, type ReactNode } from "react";

type Props = {
  sectionClass?: string;
  title: string;
  children: ReactNode;
};

const TitledSection = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <section ref={ref} className={props.sectionClass}>
    <h4 className="font-medium text-2xl text-secondary mb-5">{props.title}</h4>
    {props.children}
  </section>
));

export default TitledSection;

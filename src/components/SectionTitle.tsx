import { clx } from "@/lib/styling";

type Props = {
  className?: string;
  children: string;
};

export default function SectionTitle(props: Props) {
  return (
    <h4 className={clx("font-medium text-2xl text-secondary", props.className)}>
      {props.children}
    </h4>
  );
}

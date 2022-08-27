import { clx } from "@/lib/styling";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  withContainer?: boolean;
};

export default function Main(props: Props) {
  return (
    <main className={clx({ "primary-container": props.withContainer })}>
      {props.children}
    </main>
  );
}

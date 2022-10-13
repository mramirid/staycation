import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Main(props: Props) {
  return <main className="app-container">{props.children}</main>;
}

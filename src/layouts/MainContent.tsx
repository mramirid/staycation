import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MainContent(props: Props) {
  return <main className="primary-container">{props.children}</main>;
}

import { clx } from "@/utils/styling";
import { NavLink } from "react-router-dom";

type BreadcrumbsProps = {
  data: BreadcrumbsData;
  className?: string;
};

export type BreadcrumbsData = {
  label: string;
  to: string;
}[];

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <nav className={clx("breadcrumbs text-lg", props.className)}>
      <ul>
        {props.data.map((datum, i) => (
          <Breadcrumb to={datum.to} key={i}>
            {datum.label}
          </Breadcrumb>
        ))}
      </ul>
    </nav>
  );
}

type BreadcrumbProps = {
  to: string;
  children: string;
};

function Breadcrumb(props: BreadcrumbProps) {
  const getNavLinkClass = (props: { isActive: boolean }) => {
    return props.isActive ? "text-secondary font-medium" : "text-light";
  };

  return (
    <li>
      <NavLink to={props.to} className={getNavLinkClass}>
        {props.children}
      </NavLink>
    </li>
  );
}

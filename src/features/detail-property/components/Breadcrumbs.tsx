import { NavLink } from "react-router-dom";

type Props = {
  data: BreadcrumbsData;
};

export type BreadcrumbsData = {
  label: string;
  to: string;
}[];

export default function Breadcrumbs(props: Props) {
  return (
    <nav className="breadcrumbs text-lg">
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

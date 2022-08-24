import BrandText from "@/components/BrandText";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-base-200 -mx-">
      <div className="primary-container">
        <nav className="navbar h-20 p-0">
          <div className="flex-1">
            <BrandText />
          </div>
          <ul className="flex-none flex gap-x-7">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/browse-by">Browse By</NavItem>
            <NavItem to="/stories">Stories</NavItem>
            <NavItem to="/agents">Agents</NavItem>
          </ul>
        </nav>
      </div>
    </header>
  );
}

type NavItemProps = {
  to: string;
  children: string;
};

function NavItem(props: NavItemProps) {
  const getNavLinkClass = (props: { isActive: boolean }) => {
    const className =
      "btn btn-link normal-case px-4 text-base font-normal !p-0 ";
    return className + (props.isActive ? "text-primary" : "text-secondary");
  };

  return (
    <li>
      <NavLink className={getNavLinkClass} to={props.to}>
        {props.children}
      </NavLink>
    </li>
  );
}

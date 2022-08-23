import BrandText from "@/components/BrandText";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={`border-b border-grayE5`}>
      <div className="the-container">
        <nav className="navbar h-20">
          <div className="flex-1">
            <BrandText />
          </div>
          <ul className="flex-none">
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
  const classNameHandler = (props: { isActive: boolean }) => {
    const className = "btn btn-link normal-case px-4 text-base font-normal ";
    return className + (props.isActive ? "text-primary" : "text-secondary");
  };

  return (
    <li>
      <NavLink className={classNameHandler} to={props.to}>
        {props.children}
      </NavLink>
    </li>
  );
}

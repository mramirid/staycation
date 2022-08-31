import BrandText from "@/components/BrandText";
import { clx } from "@/utils/styling";
import { Fade } from "react-awesome-reveal";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Fade triggerOnce>
      <header className="border-b border-base-200">
        <div className="app-container">
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
    </Fade>
  );
}

type NavItemProps = {
  to: string;
  children: string;
};

function NavItem(props: NavItemProps) {
  const getNavLinkClass = (props: { isActive: boolean }) => {
    const textColor = props.isActive ? "text-primary" : "text-secondary";
    const className = clx(
      "btn btn-link normal-case px-4 text-base font-normal !p-0",
      textColor
    );
    return className;
  };

  return (
    <li>
      <NavLink className={getNavLinkClass} to={props.to}>
        {props.children}
      </NavLink>
    </li>
  );
}

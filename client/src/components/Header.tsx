import { clx } from "@/utils/styling";
import { Fade } from "react-awesome-reveal";
import { NavLink } from "react-router-dom";
import BrandText from "./BrandText";

type HeaderProps = {
  logoOnly?: boolean;
};

export default function Header({ logoOnly = false }: HeaderProps) {
  let navContent: JSX.Element;

  if (logoOnly) {
    navContent = (
      <>
        <div className="navbar-start"></div>
        <div className={clx("navbar-center", { hidden: !logoOnly })}>
          <BrandText />
        </div>
        <ul className="navbar-end"></ul>
      </>
    );
  } else {
    navContent = (
      <>
        <div className="navbar-start">
          <DropdownMenu className="lg:hidden" />
          <BrandText />
        </div>
        <ul className="navbar-end invisible lg:visible flex gap-x-7">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/browse-by">Browse By</NavItem>
          <NavItem to="/stories">Stories</NavItem>
          <NavItem to="/agents">Agents</NavItem>
        </ul>
      </>
    );
  }

  return (
    <Fade triggerOnce className="relative z-10">
      <header className="border-b border-base-200">
        <div className="app-container">
          <nav className="navbar h-20 p-0">{navContent}</nav>
        </div>
      </header>
    </Fade>
  );
}

type DropdownMenuProps = {
  className: string;
};

function DropdownMenu({ className }: DropdownMenuProps) {
  return (
    <div className={clx("dropdown", className)}>
      <button tabIndex={0} className="btn btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 aspect-square"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </button>
      <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/browse-by">Browse By</NavItem>
        <NavItem to="/stories">Stories</NavItem>
        <NavItem to="/agents">Agents</NavItem>
      </ul>
    </div>
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

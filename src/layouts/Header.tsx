import BrandText from "@/components/BrandText";
import Button from "@/components/Button";
import { isNull } from "lodash-es";
import { useMatch } from "react-router-dom";
import classes from "./Header.module.scss";

export default function Header() {
  return (
    <header className={`${classes.header} spacing-sm`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
          <BrandText />
          <ul className="navbar-nav">
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
  const match = useMatch(props.to);

  const activeClass = !isNull(match) ? "active" : "";

  return (
    <li className={`nav-item ${activeClass}`}>
      <Button type="nav-link" to={props.to} className="nav-link">
        {props.children}
      </Button>
    </li>
  );
}

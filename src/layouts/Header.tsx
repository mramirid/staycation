import BrandText from "@/components/BrandText";
import Button from "@/components/Button";
import { isNull } from "lodash-es";
import { useMatch } from "react-router-dom";

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
  const match = useMatch(props.to);

  const activeClass = !isNull(match) ? "!text-primary" : "";

  return (
    <li>
      <Button
        className={`px-4 text-secondary text-base font-normal ${activeClass}`}
        type="nav-link"
        to={props.to}
      >
        {props.children}
      </Button>
    </li>
  );
}

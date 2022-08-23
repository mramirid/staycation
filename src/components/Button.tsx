import type { CSSProperties, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

type StyleProps = {
  size?: "small" | "large";
  style?: CSSProperties;
  className?: string;
  isPrimary?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isBlock?: boolean;
  hasShadow?: boolean;
};

type BaseProps = StyleProps & {
  children: ReactNode;
  onClick?: () => void;
};

type NormalButtonProps = BaseProps & { type: "button" };

type InternalLinkProps = BaseProps & { type: "link"; to: string };

type InternalNavLinkProps = BaseProps & {
  /** @deprecated nav-link is broken, use NavLink from react-router instead */
  type: "nav-link";
  to: string;
  className?: string | ((props: { isActive: boolean }) => string | undefined);
};

type ExternalLinkProps = BaseProps & {
  type: "external-link";
  href: string;
  isBlank?: boolean;
};

type AnchorLinkProps =
  | InternalLinkProps
  | InternalNavLinkProps
  | ExternalLinkProps;

type Props = NormalButtonProps | AnchorLinkProps;

export default function Button(props: Props) {
  const className = buildClassName(props);

  const handleClick = () => {
    props.onClick?.();
  };

  if (props.type === "button") {
    return (
      <NormalButton {...props} className={className} onClick={handleClick} />
    );
  }
  return <AnchorLink {...props} className={className} onClick={handleClick} />;
}

function buildClassName(props: Props) {
  const classNameSet = new Set(["btn normal-case", props.className]);

  if (props.isPrimary) {
    classNameSet.add("btn-primary");
  }

  switch (props.size) {
    case "small":
      classNameSet.add("btn-sm");
      break;
    case "large":
      classNameSet.add("btn-lg");
      break;
  }

  if (props.isBlock) {
    classNameSet.add("btn-block");
  }

  if (props.hasShadow) {
    classNameSet.add("btn-shadow");
  }

  if (props.isDisabled) {
    classNameSet.add("btn-disabled");
  }

  if (props.isLoading) {
    classNameSet.add("loading");
  }

  return Array.from(classNameSet).join(" ").trim();
}

function NormalButton(props: NormalButtonProps) {
  const className = `${props.className} rounded font-medium`;

  return (
    <button
      className={className}
      style={props.style}
      onClick={props.onClick}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
}

function AnchorLink(props: AnchorLinkProps) {
  const className = `${props.className} btn-link`;

  if (props.type === "external-link") {
    return <ExternalLink {...props} className={className} />;
  }
  return <InternalLink {...props} className={className} />;
}

function ExternalLink(props: ExternalLinkProps) {
  const target = props.isBlank ? "_blank" : undefined;
  const rel = props.isBlank ? "noopener noreferrer" : undefined;

  return (
    <a
      href={props.href}
      className={props.className}
      style={props.style}
      target={target}
      rel={rel}
    >
      {props.children}
    </a>
  );
}

function InternalLink(props: InternalLinkProps | InternalNavLinkProps) {
  const InternalLink = props.type === "nav-link" ? NavLink : Link;
  return (
    <InternalLink
      to={props.to}
      className={props.className}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </InternalLink>
  );
}

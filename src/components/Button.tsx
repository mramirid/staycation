import type { CSSProperties, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

type StyleProps = {
  size?: "small" | "large";
  style?: CSSProperties;
  className?: string;
  isPrimary?: boolean;
  isDisabled?: boolean;
  isBlock?: boolean;
  hasShadow?: boolean;
};

type BaseProps = StyleProps & {
  isLoading?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

type NormalButtonProps = BaseProps & { type: "button" };

type InternalLinkProps = BaseProps & { type: "link"; to: string };

type InternalNavLinkProps = BaseProps & {
  type: "nav-link";
  to: string;

  //! Broken type
  // className?: string | ((props: { isActive: boolean }) => string | undefined);
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

export default function Button(props: NormalButtonProps | AnchorLinkProps) {
  const className = buildClassName(props);

  const handleClick = () => {
    props.onClick?.();
  };

  if (props.isLoading) {
    return <LoadingIndicator />;
  }

  if (props.type === "button") {
    return (
      <NormalButton {...props} className={className} onClick={handleClick} />
    );
  }

  return <AnchorLink {...props} className={className} onClick={handleClick} />;
}

function buildClassName(styleProps: StyleProps) {
  const classNameSet = new Set(["btn", styleProps.className]);

  if (styleProps.isPrimary) {
    classNameSet.add("btn-primary");
  }

  switch (styleProps.size) {
    case "small":
      classNameSet.add("btn-sm");
      break;
    case "large":
      classNameSet.add("btn-lg");
      break;
  }

  if (styleProps.isBlock) {
    classNameSet.add("btn-block");
  }

  if (styleProps.hasShadow) {
    classNameSet.add("btn-shadow");
  }

  if (styleProps.isDisabled) {
    classNameSet.add("disabled");
  }

  return Array.from(classNameSet).join(" ").trim();
}

function LoadingIndicator(props: StyleProps) {
  return (
    <span className={props.className} style={props.style}>
      <span className="spinner-border spinner-border-sm mx-5" />
      <span className="sr-only">Loading...</span>
    </span>
  );
}

function NormalButton(props: NormalButtonProps) {
  return (
    <button
      className={props.className}
      style={props.style}
      onClick={props.onClick}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
}

function AnchorLink(props: AnchorLinkProps) {
  if (props.type === "external-link") {
    return <ExternalLink {...props} />;
  }
  return <InternalLink {...props} />;
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

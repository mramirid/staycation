import type { CSSProperties } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

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
  children: string;
  onClick?: () => void;
};

type NormalButtonProps = BaseProps & {
  isLink?: false;
};

type BaseLinkProps = BaseProps & {
  isLink: true;
  href: string;
};

type InternalLinkProps = BaseLinkProps & {
  isExternal?: false;
};

type ExternalLinkProps = BaseLinkProps & {
  isExternal: true;
  isBlank?: boolean;
};

type LinkProps = InternalLinkProps | ExternalLinkProps;

export default function Button(props: NormalButtonProps | LinkProps) {
  const className = buildClassName(props);

  const handleClick = () => {
    props.onClick?.();
  };

  if (props.isLoading) {
    return <LoadingButton />;
  }
  if (props.isLink) {
    return <Link {...props} className={className} onClick={handleClick} />;
  }
  return (
    <NormalButton {...props} className={className} onClick={handleClick} />
  );
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

  return Array.from(classNameSet).join(" ");
}

function LoadingButton(props: StyleProps) {
  return (
    <span className={props.className} style={props.style}>
      <span className="spinner-border spinner-border-sm mx-5" />
      <span className="sr-only">Loading...</span>
    </span>
  );
}

function Link(props: LinkProps) {
  if (props.isExternal) {
    return <ExternalLink {...props} />;
  }

  return (
    <ReactRouterLink
      to={props.href}
      className={props.className}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </ReactRouterLink>
  );
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

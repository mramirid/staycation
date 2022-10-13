import { clx } from "@/utils/styling";
import type { HTMLProps, ReactElement } from "react";
import { Link } from "react-router-dom";
import BrandText from "./BrandText";
import classes from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className="border-t border-base-200">
      <div
        className={clx(
          "app-container mt-50px grid gap-30px text-center",
          "lg:grid-cols-3 lg:text-left"
        )}
      >
        <Brand className="lg:col-span-1" />
        <Menu className="lg:col-span-2" />
      </div>
      <Copyright className="mt-50px text-center mb-100px" />
    </footer>
  );
}

type BrandProps = { className: string };

function Brand({ className }: BrandProps) {
  return (
    <div className={className}>
      <BrandText />
      <p className="text-light mt-2">
        We kaboom your beauty holiday
        <br /> instantly and memorable.
      </p>
    </div>
  );
}

type MenuProps = { className: string };

function Menu(props: MenuProps) {
  return (
    <nav
      className={clx(
        "flex flex-col gap-y-30px lg:flex-row lg:justify-between",
        props.className
      )}
    >
      <div>
        <h6 className={classes.menu__title}>For Beginners</h6>
        <ul className={classes.menu__list}>
          <LinkItem label="New Account" type="internal-link" to="#" />
          <LinkItem label="Start Booking a Room" type="internal-link" to="#" />
          <LinkItem label="Use Payments" type="internal-link" to="#" />
        </ul>
      </div>
      <div>
        <h6 className={classes.menu__title}>Explore Us</h6>
        <ul className={classes.menu__list}>
          <LinkItem label="Our Careers" type="internal-link" to="#" />
          <LinkItem label="Privacy" type="internal-link" to="#" />
          <LinkItem label="Terms & Conditions" type="internal-link" to="#" />
        </ul>
      </div>
      <div>
        <h6 className={classes.menu__title}>Connect Us</h6>
        <ul className={classes.menu__list}>
          <LinkItem
            label="amir.muh.hakim@gmail.com"
            type="external-link"
            href="mailto:amir.muh.hakim@gmail.com"
          />
          <LinkItem
            label="021 - 2208 - 1996"
            type="external-link"
            href="tel:+622122081996"
          />
          <LinkItem
            label="Staycation HQ, Surabaya, Indonesia"
            type="external-link"
            href="https://goo.gl/maps/agc1c6SxniyUuToj6"
          />
        </ul>
      </div>
    </nav>
  );
}

type SitemapItemProps = { label: string } & (
  | { type: "internal-link"; to: string }
  | { type: "external-link"; href: string }
);

function LinkItem(props: SitemapItemProps) {
  let link: ReactElement;
  const className = clx(classes.menu__link, "text-light");

  switch (props.type) {
    case "internal-link":
      link = (
        <Link to={props.to} className={className}>
          {props.label}
        </Link>
      );
      break;
    case "external-link":
      link = (
        <ExternalLink href={props.href} className={className}>
          {props.label}
        </ExternalLink>
      );
      break;
  }

  return <li>{link}</li>;
}

type ExternalLinkProps = Omit<HTMLProps<HTMLAnchorElement>, "target" | "rel">;

function ExternalLink(props: ExternalLinkProps) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}

type CopyrightProps = {
  className: string;
};

function Copyright({ className }: CopyrightProps) {
  return (
    <p className={clx("text-light", className)}>
      Copyright 2019 • All rights reserved • Staycation
    </p>
  );
}

import BrandText from "@/components/BrandText";
import { clx } from "@/lib/styling";
import { nanoid } from "@reduxjs/toolkit";
import type { HTMLProps, ReactElement } from "react";
import { Link } from "react-router-dom";

type SiteMapType = {
  title: string;
  menus: SiteMapMenuType[];
};

type SiteMapMenuType = { label: string } & (
  | { type: "internal-link"; to: string }
  | { type: "external-link"; href: string }
);

const siteMaps: SiteMapType[] = [
  {
    title: "For Beginners",
    menus: [
      {
        label: "New Account",
        type: "internal-link",
        to: "#",
      },
      {
        label: "Start Booking a Room",
        type: "internal-link",
        to: "#",
      },
      {
        label: "Use Payments",
        type: "internal-link",
        to: "#",
      },
    ],
  },
  {
    title: "Explore Us",
    menus: [
      {
        label: "Our Careers",
        type: "internal-link",
        to: "#",
      },
      {
        label: "Privacy",
        type: "internal-link",
        to: "#",
      },
      {
        label: "Terms & Conditions",
        type: "internal-link",
        to: "#",
      },
    ],
  },
  {
    title: "Connect Us",
    menus: [
      {
        label: "amir.muh.hakim@gmail.com",
        type: "external-link",
        href: "mailto:amir.muh.hakim@gmail.com",
      },
      {
        label: "021 - 2208 - 1996",
        type: "external-link",
        href: "tel:+622122081996",
      },
      {
        label: "Staycation, Surabaya, Indonesia",
        type: "external-link",
        href: "https://goo.gl/maps/agc1c6SxniyUuToj6",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-base-200">
      <div className="app-container grid grid-cols-3 gap-x-30px mt-50px">
        <Brand className="col-span-1" />
        <nav className="col-span-2 flex justify-between">
          {siteMaps.map((siteMap) => (
            <SiteMap siteMap={siteMap} key={nanoid()} />
          ))}
        </nav>
      </div>
      <Copyright className="mt-50px text-center mb-100px" />
    </footer>
  );
}

type BrandProps = {
  className: string;
};

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

type SiteMapProps = {
  siteMap: SiteMapType;
};

function SiteMap(props: SiteMapProps) {
  return (
    <div>
      <h6 className="font-medium text-lg min-h-[45] leading-[3rem]">
        {props.siteMap.title}
      </h6>
      <ul className="mt-2 flex flex-col gap-y-2">
        {props.siteMap.menus.map((menu) => (
          <SiteMapMenu menu={menu} className="text-light" key={nanoid()} />
        ))}
      </ul>
    </div>
  );
}

type SitemapMenuProps = {
  className: string;
  menu: SiteMapMenuType;
};

function SiteMapMenu({ menu, className }: SitemapMenuProps) {
  let content: ReactElement;

  switch (menu.type) {
    case "internal-link":
      content = (
        <Link to={menu.to} className={clx("link link-hover", className)}>
          {menu.label}
        </Link>
      );
      break;
    case "external-link":
      content = (
        <ExternalLink
          href={menu.href}
          className={clx("link link-hover", className)}
        >
          {menu.label}
        </ExternalLink>
      );
      break;
  }

  return <li>{content}</li>;
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

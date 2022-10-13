/// <reference types="vite-plugin-svgr/client" />

import { clx } from "@/utils/styling";
import type { FunctionComponent, SVGProps } from "react";
import { Fade } from "react-awesome-reveal";
import { ReactComponent as IconCities } from "../assets/icons/cities.svg";
import { ReactComponent as IconTraveler } from "../assets/icons/traveler.svg";
import { ReactComponent as IconTreasure } from "../assets/icons/treasure.svg";
import imageHero from "../assets/images/hero.jpg";

type HeroProps = {
  statistics: HeroStatistics;
  onShowMeClicked: () => void;
};

export default function Hero(props: HeroProps) {
  return (
    <Fade direction="up" triggerOnce>
      <section className="mt-70px grid gap-y-20 grid-cols-12">
        <HeroContent className="col-span-full xl:col-span-5" {...props} />
        <HeroBanner className="col-span-full xl:col-span-7" />
      </section>
    </Fade>
  );
}

type HeroContentProps = HeroProps & { className: string };

export type HeroStatistics = {
  travelerCount: number;
  treasureCount: number;
  cityCount: number;
};

function HeroContent(props: HeroContentProps) {
  return (
    <div className={props.className}>
      <h1 className="text-[2.625rem] text-secondary font-bold">
        Forget Busy Work,
        <br /> Start Next Vacation
      </h1>

      <p className="mt-5 text-light leading-7">
        We provide what you need to enjoy your
        <br /> holiday with family. Time to make another
        <br /> memorable moments.
      </p>

      <button
        className="app-btn app-btn-primary mt-30px"
        onClick={props.onShowMeClicked}
        type="button"
      >
        Show Me Now
      </button>

      <div className="mt-20 grid grid-cols-3 gap-x-12">
        <Statistic
          Icon={IconTraveler}
          total={props.statistics.travelerCount}
          unit="travelers"
        />
        <Statistic
          Icon={IconTreasure}
          total={props.statistics.treasureCount}
          unit="treasures"
        />
        <Statistic
          Icon={IconCities}
          total={props.statistics.cityCount}
          unit="cities"
        />
      </div>
    </div>
  );
}

type StatisticProps = {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  total: number;
  unit: string;
};

function Statistic(props: StatisticProps) {
  const formattedTotal = props.total.toLocaleString();

  return (
    <div>
      <props.Icon width={32} height={32} />

      <h6 className="mt-3 text-light">
        <b className="text-semibold">{formattedTotal}</b> {props.unit}
      </h6>
    </div>
  );
}

type HeroBannerProps = {
  className: string;
};

function HeroBanner(props: HeroBannerProps) {
  return (
    <div
      className={clx(
        "relative aspect-square w-full justify-self-center",
        "xl:h-full xl:w-auto xl:justify-self-end",
        props.className
      )}
    >
      <div className="absolute bottom-0 right-0 top-10 left-10 border-2 rounded-2xl" />
      <div
        className={clx(
          "absolute bg-cover bg-no-repeat bottom-10",
          "right-10 left-0 top-0 rounded-2xl rounded-tl-[100px]"
        )}
        style={{ backgroundImage: `url(${imageHero})` }}
      />
    </div>
  );
}

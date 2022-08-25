/// <reference types="vite-plugin-svgr/client" />

import landingPageData from "@/assets/data/landing-page.json";
import { ReactComponent as IconCities } from "@/assets/icons/icon-cities.svg";
import { ReactComponent as IconTraveler } from "@/assets/icons/icon-traveler.svg";
import { ReactComponent as IconTreasure } from "@/assets/icons/icon-treasure.svg";
import imageHero from "@/assets/images/hero.jpg";
import Button from "@/components/Button";
import { clx } from "@/lib/styling";
import { isNumber } from "lodash-es";
import type { FunctionComponent, RefObject, SVGProps } from "react";

type Props = {
  mostPickedRef: RefObject<HTMLDivElement>;
};

export default function Hero(props: Props) {
  return (
    <section className="pt-[4.375rem] grid grid-cols-12">
      <HeroContent className="col-span-5" {...props} />
      <HeroBanner className="col-span-7" />
    </section>
  );
}

type HeroContentProps = Props & { className: string };

const STATISTICS = landingPageData.hero;

function HeroContent(props: HeroContentProps) {
  const scrollToMostPicked = () => {
    const mostPickedOffsetTop = props.mostPickedRef.current?.offsetTop;
    if (isNumber(mostPickedOffsetTop)) {
      window.scrollTo({ behavior: "smooth", top: mostPickedOffsetTop - 30 });
    }
  };

  return (
    <div className={props.className}>
      <h1 className="text-[2.625rem] text-secondary font-bold">
        Forget Busy Work,
        <br /> Start Next Vacation
      </h1>

      <p className="mt-5 font-light text-base-300 leading-7">
        We provide what you need to enjoy your
        <br /> holiday with family. Time to make another
        <br /> memorable moments.
      </p>

      <Button
        type="button"
        isPrimary
        className="px-7 mt-[1.875rem] min-w-[13rem]"
        onClick={scrollToMostPicked}
      >
        Show Me Now
      </Button>

      <div className="mt-20 grid grid-cols-3 gap-x-12">
        <Statistic
          Icon={IconTraveler}
          total={STATISTICS.travelers}
          unit="travelers"
        />
        <Statistic
          Icon={IconTreasure}
          total={STATISTICS.treasures}
          unit="treasures"
        />
        <Statistic Icon={IconCities} total={STATISTICS.cities} unit="cities" />
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

      <h6 className="mt-3 text-secondary">
        {formattedTotal}{" "}
        <span className="text-base-300 font-light">{props.unit}</span>
      </h6>
    </div>
  );
}

type HeroBannerProps = {
  className: string;
};

function HeroBanner(props: HeroBannerProps) {
  return (
    <div className={clx("relative", props.className)}>
      <div className="absolute bottom-0 right-0 w-[31rem] aspect-[253/200] border-2 rounded-2xl" />
      <div
        className={clx(
          "absolute bg-cover bg-no-repeat w-[31rem] bottom-10",
          "right-10 top-0 rounded-2xl rounded-tl-[100px]"
        )}
        style={{ backgroundImage: `url(${imageHero})` }}
      />
    </div>
  );
}

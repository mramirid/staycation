import Testimonial from "@/components/Testimonial";
import {
  Categories,
  Hero,
  landingPageData,
  MostPicked,
} from "@/features/landing-page";
import Header from "@/layouts/Header";
import MainContent from "@/layouts/MainContent";
import { isNumber } from "lodash-es";
import { createRef } from "react";

const TESTIMONIAL = landingPageData.testimonial;

export default function LandingPage() {
  const mostPickedRef = createRef<HTMLDivElement>();

  const scrollToMostPicked = () => {
    const mostPickedOffsetTop = mostPickedRef.current?.offsetTop;
    if (isNumber(mostPickedOffsetTop)) {
      window.scrollTo({ behavior: "smooth", top: mostPickedOffsetTop - 30 });
    }
  };

  return (
    <>
      <Header />
      <MainContent>
        <Hero onShowMeClicked={scrollToMostPicked} />
        <MostPicked className="my-70px" ref={mostPickedRef} />
        <Categories />
        <Testimonial className="my-100px" testimonial={TESTIMONIAL} />
      </MainContent>
    </>
  );
}

import Testimonial from "@/components/Testimonial";
import { Categories, Hero, MostPicked } from "@/features/landing-page";
import Header from "@/layouts/Header";
import MainContent from "@/layouts/MainContent";
import { isNumber } from "lodash-es";
import { createRef } from "react";

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
        <Hero
          mostPickedRef={mostPickedRef}
          onShowMeClicked={scrollToMostPicked}
        />
        <MostPicked className="my-70px" ref={mostPickedRef} />
        <Categories />
        <Testimonial />
      </MainContent>
    </>
  );
}

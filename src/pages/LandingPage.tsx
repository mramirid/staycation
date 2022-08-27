import Testimonial from "@/components/Testimonial";
import {
  Categories,
  Hero,
  landingPageData,
  MostPicked,
} from "@/features/landing-page";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Main from "@/layouts/Main";
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
      <Main withContainer>
        <Hero onShowMeClicked={scrollToMostPicked} />
        <MostPicked className="my-70px" ref={mostPickedRef} />
        <Categories />
        <Testimonial className="my-100px" testimonial={TESTIMONIAL} />
      </Main>
      <Footer />
    </>
  );
}

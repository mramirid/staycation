import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Testimonial from "@/components/Testimonial";
import { isNumber } from "lodash-es";
import { createRef } from "react";
import landingPageData from "../assets/data/landing-page.json";
import Categories from "./Categories";
import Hero from "./Hero";
import MostPicked from "./MostPicked";

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

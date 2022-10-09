import Categories from "@/features/landing-page/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Testimonial from "@/components/Testimonial";
import { isNumber } from "lodash-es";
import { createRef, useEffect } from "react";
import {
  categories as CATEGORIES,
  testimonial as TESTIMONIAL,
} from "../assets/landing-page.data.json";
import Hero from "./Hero";
import MostPicked from "./MostPicked";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Home - Staycation";
  }, []);

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
        <MostPicked className="mt-70px" ref={mostPickedRef} />
        <Categories className="mt-70px" categories={CATEGORIES} />
        <Testimonial className="my-100px" testimonial={TESTIMONIAL} />
      </Main>
      <Footer />
    </>
  );
}

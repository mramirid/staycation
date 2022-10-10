import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Testimonial, { type TestimonialType } from "@/components/Testimonial";
import { ResponseError } from "@/lib/error";
import { isNumber } from "lodash-es";
import { createRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Categories, { type Category } from "./Categories";
import Hero, { type HeroStatistics } from "./Hero";
import MostPicked, { type MostPickedProperty } from "./MostPicked";

export default function LandingPage() {
  const data = useLoaderData() as LandingPageData;

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
        <Hero
          onShowMeClicked={scrollToMostPicked}
          statistics={data.heroStatistics}
        />
        <MostPicked
          className="mt-70px"
          ref={mostPickedRef}
          mostPickedProperties={data.mostPickedProperties}
        />
        <Categories className="mt-70px" categories={data.categories} />
        <Testimonial className="my-100px" testimonial={data.testimonial} />
      </Main>
      <Footer />
    </>
  );
}

export async function loader(): Promise<Response> {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_BASE_URL + "/api/v1/client/landing"
  );
  if (!response.ok) {
    const resBody = await response.json();
    throw new ResponseError(resBody.error, response.status);
  }
  return response;
}

type LandingPageData = {
  heroStatistics: HeroStatistics;
  mostPickedProperties: MostPickedProperty[];
  categories: Category[];
  testimonial: TestimonialType;
};

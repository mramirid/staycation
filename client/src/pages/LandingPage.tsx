import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Testimonial, { type TestimonialType } from "@/components/Testimonial";
import {
  Categories,
  Hero,
  MostPicked,
  type Category,
  type HeroStatistics,
  type MostPickedProperty,
} from "@/features/landing";
import { ResponseError } from "@/lib/error";
import { getErrorMessage } from "@/utils/error";
import { isNumber } from "lodash-es";
import { createRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

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

  const data = useLoaderData() as LandingPageData;

  return (
    <>
      <Header />
      <Main>
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
    import.meta.env.VITE_CMS_BASE_URL + "/api/v1/client/landing"
  );

  if (!response.ok) {
    const error = await response.json();
    throw new ResponseError(getErrorMessage(error), response.status);
  }

  return response;
}

type LandingPageData = {
  heroStatistics: HeroStatistics;
  mostPickedProperties: MostPickedProperty[];
  categories: Category[];
  testimonial: TestimonialType;
};

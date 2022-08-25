import Categories from "@/features/landing-page/components/Categories";
import Hero from "@/features/landing-page/Hero";
import MostPicked from "@/features/landing-page/MostPicked";
import Header from "@/layouts/Header";
import MainContent from "@/layouts/MainContent";
import { createRef } from "react";

export default function LandingPage() {
  const mostPickedRef = createRef<HTMLDivElement>();

  return (
    <>
      <Header />
      <MainContent>
        <Hero mostPickedRef={mostPickedRef} />
        <MostPicked className="my-70px" ref={mostPickedRef} />
        <Categories />
      </MainContent>
    </>
  );
}

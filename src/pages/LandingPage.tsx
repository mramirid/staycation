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
        <MostPicked className="mt-[4.38rem]" ref={mostPickedRef} />
      </MainContent>
    </>
  );
}

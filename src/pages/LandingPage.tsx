import landingPageData from "@/data/landing-page.json";
import Hero from "@/features/landing-page/Hero";
import Header from "@/layouts/Header";
import MainContent from "@/layouts/MainContent";
import { useRef } from "react";

export default function LandingPage() {
  const mostPickedRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header />
      <MainContent>
        <Hero statistics={landingPageData.hero} mostPickedRef={mostPickedRef} />
      </MainContent>
    </>
  );
}

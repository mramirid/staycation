import PROPERTY from "@/assets/data/property.data.json";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Testimonial from "@/components/Testimonial";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useParams } from "react-router-dom";
import Breadcrumbs, { type BreadcrumbsData } from "./Breadcrumbs";
import Description from "./Description";
import FeaturedImages from "./FeaturedImages";
import PageTitle from "./PageTitle";
import StartBookingForm from "./StartBookingForm";

const PAGE_DETAILS_TITLE = "Detail Property";

export default function PropertyDetailsPage() {
  useEffect(() => {
    document.title = `${PAGE_DETAILS_TITLE} - Staycation`;
    window.scrollTo(0, 0);
  }, []);

  const { id: propertyId } = useParams();

  const breadcrumbsData: BreadcrumbsData = [
    { label: "Home", to: "/" },
    { label: PAGE_DETAILS_TITLE, to: `/properties/${propertyId}` },
  ];

  return (
    <>
      <Header />
      <Main withContainer>
        <Fade
          direction="up"
          triggerOnce
          className="my-50px grid grid-cols-4 items-center"
        >
          <>
            <Breadcrumbs data={breadcrumbsData} />
            <PageTitle
              title={PROPERTY.name}
              city={PROPERTY.city}
              country={PROPERTY.country}
              className="col-span-2"
            />
          </>
        </Fade>

        <FeaturedImages imageUrls={PROPERTY.imageUrls} />

        <Fade
          className="mt-50px grid grid-cols-12 gap-x-50px"
          direction="up"
          triggerOnce
        >
          <>
            <Description
              className="col-span-7"
              description={PROPERTY.description}
              features={PROPERTY.features}
            />
            <StartBookingForm property={PROPERTY} className="col-span-5" />
          </>
        </Fade>

        <Categories className="mt-70px" categories={PROPERTY.categories} />

        <Testimonial className="my-100px" testimonial={PROPERTY.testimonial} />
      </Main>
      <Footer />
    </>
  );
}

import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Testimonial from "@/components/Testimonial";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useParams } from "react-router-dom";
import property from "../assets/data/item-details.json";
import BookingForm from "./BookingForm";
import Breadcrumbs, { type BreadcrumbsData } from "./Breadcrumbs";
import Description from "./Description";
import FeaturedImages from "./FeaturedImages";
import PageTitle from "./PageTitle";

const DETAIL_PAGE_TITLE = "Detail Property";

export default function DetailPropertyPage() {
  useEffect(() => {
    document.title = `${DETAIL_PAGE_TITLE} - Staycation`;
  }, []);

  const { id: propertyId } = useParams();

  const breadcrumbsData: BreadcrumbsData = [
    { label: "Home", to: "/" },
    { label: DETAIL_PAGE_TITLE, to: `/properties/${propertyId}` },
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
              title={property.name}
              city={property.city}
              country={property.country}
              className="col-span-2"
            />
          </>
        </Fade>

        <FeaturedImages imageUrls={property.imageUrls} />

        <Fade
          className="mt-50px grid grid-cols-12 gap-x-50px"
          direction="up"
          triggerOnce
        >
          <>
            <Description
              className="col-span-7"
              description={property.description}
              features={property.features}
            />
            <BookingForm property={property} className="col-span-5" />
          </>
        </Fade>

        <Categories className="mt-70px" categories={property.categories} />

        <Testimonial className="my-100px" testimonial={property.testimonial} />
      </Main>
      <Footer />
    </>
  );
}

import Breadcrumbs, { type BreadcrumbsData } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Testimonial from "@/components/Testimonial";
import { StartBookingForm } from "@/features/booking";
import {
  getProperty,
  PropertyActivities,
  PropertyDescription,
  PropertyHeading,
  PropertyImages,
  type Property,
} from "@/features/property";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";

const PAGE_DETAILS_TITLE = "Detail Property";

export default function PropertyDetailPage() {
  const property = useLoaderData() as Property;

  useEffect(() => {
    document.title = `${PAGE_DETAILS_TITLE} - Staycation`;
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbsData: BreadcrumbsData = [
    { label: "Home", to: "/" },
    { label: PAGE_DETAILS_TITLE, to: `/properties/${property._id}` },
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
            <PropertyHeading
              title={property.title}
              city={property.city}
              country={property.country}
              className="col-span-2"
            />
          </>
        </Fade>

        <PropertyImages imageUrls={property.imageUrls} />

        <Fade
          className="mt-50px grid grid-cols-12 gap-x-50px"
          direction="up"
          triggerOnce
        >
          <>
            <PropertyDescription
              className="col-span-7"
              description={property.description}
              features={property.features}
            />
            <StartBookingForm
              className="col-span-5"
              propertyPrice={property.price}
              propertyUnit={property.unit}
            />
          </>
        </Fade>

        <PropertyActivities
          className="mt-70px"
          activities={property.activities}
        />

        <Testimonial className="my-100px" testimonial={property.testimonial} />
      </Main>
      <Footer />
    </>
  );
}

export async function loader(args: LoaderFunctionArgs) {
  const { id: propertyId } = args.params;
  return getProperty(propertyId ?? "");
}

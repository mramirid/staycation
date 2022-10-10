import Breadcrumbs, { type BreadcrumbsData } from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Testimonial, { type TestimonialType } from "@/components/Testimonial";
import { StartBookingForm } from "@/features/booking";
import {
  PropertyActivities,
  PropertyDescription,
  PropertyHeading,
  PropertyImages,
  type PropertyActivity,
  type PropertyFeature,
} from "@/features/property";
import { ResponseError } from "@/lib/error";
import { StatusCodes } from "http-status-codes";
import { isUndefined } from "lodash-es";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import {
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
} from "react-router-dom";

const PAGE_DETAILS_TITLE = "Detail Property";

export default function PropertyDetailPage() {
  const data = useLoaderData() as PropertyDetailData;

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
            <PropertyHeading
              title={data.title}
              city={data.city}
              country={data.country}
              className="col-span-2"
            />
          </>
        </Fade>

        <PropertyImages imageUrls={data.imageUrls} />

        <Fade
          className="mt-50px grid grid-cols-12 gap-x-50px"
          direction="up"
          triggerOnce
        >
          <>
            <PropertyDescription
              className="col-span-7"
              description={data.description}
              features={data.features}
            />
            <StartBookingForm
              className="col-span-5"
              propertyPrice={data.price}
              propertyUnit={data.unit}
            />
          </>
        </Fade>

        <PropertyActivities className="mt-70px" activities={data.activities} />

        <Testimonial className="my-100px" testimonial={data.testimonial} />
      </Main>
      <Footer />
    </>
  );
}

export async function loader(args: LoaderFunctionArgs): Promise<Response> {
  const { id: propertyId } = args.params;

  if (isUndefined(propertyId)) {
    throw new ResponseError(
      "The property id is undefined",
      StatusCodes.NOT_FOUND
    );
  }

  const response = await fetch(
    import.meta.env.VITE_BACKEND_BASE_URL +
      "/api/v1/client/properties/" +
      propertyId
  );

  if (!response.ok) {
    const resBody = await response.json();
    throw new ResponseError(resBody.error, response.status);
  }

  return response;
}

type PropertyDetailData = {
  _id: string;
  title: string;
  price: number;
  unit: string;
  city: string;
  country: string;
  isPopular: boolean;
  category: {
    _id: string;
    name: string;
  };
  description: string;
  imageUrls: string[];
  features: PropertyFeature[];
  activities: PropertyActivity[];
  testimonial: TestimonialType;
};

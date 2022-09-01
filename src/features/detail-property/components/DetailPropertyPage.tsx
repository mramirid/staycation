import Header from "@/components/Header";
import Main from "@/components/Main";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useParams } from "react-router-dom";
import property from "../assets/data/item-details.json";
import Breadcrumbs, { type BreadcrumbsData } from "./Breadcrumbs";
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
      </Main>
    </>
  );
}

import { type TestimonialType } from "@/components/Testimonial";
import { ResponseError } from "@/lib/error";
import { getErrorMessage } from "@/utils/error";
import { StatusCodes } from "http-status-codes";
import { isEmpty } from "lodash-es";
import { type PropertyActivity } from "../components/PropertyActivities";
import { type PropertyFeature } from "../components/PropertyDescription";

/**
 * Get property details.
 * @param id The property id.
 */
export async function getProperty(id: string): Promise<Property> {
  if (isEmpty(id)) {
    throw new ResponseError(
      "The property id cannot be an empty string",
      StatusCodes.NOT_FOUND
    );
  }

  const response = await fetch(
    import.meta.env.VITE_CMS_BASE_URL + "/api/v1/client/properties/" + id
  );

  if (!response.ok) {
    const error = await response.json();
    throw new ResponseError(getErrorMessage(error), response.status);
  }

  return await response.json();
}

export type Property = {
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

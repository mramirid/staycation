import { type TestimonialType } from "@/components/Testimonial";

export type Property = {
  _id: string;
  title: string;
  type: string;
  imageUrls: ImageUrl[];
  country: string;
  city: string;
  price: number;
  unit: string;
  isPopular: boolean;
  hasBackyard: boolean;
  description: string;
  features: Feature[];
  activities: Activity[];
  testimonial: TestimonialType;
};

export type ImageUrl = {
  _id: string;
  url: string;
};

export type Feature = {
  _id: string;
  name: string;
  quantity: number;
  iconUrl: string;
};

export type Activity = {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
  isPopular: boolean;
};

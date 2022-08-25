import type { Category } from "../landing-page/types";

export type Property = {
  _id: string;
  name: string;
  type: string;
  imageUrls: ImageUrl[];
  country: string;
  city: string;
  price: string;
  unit: string;
  isPopular: boolean;
  hasBackyard: boolean;
  description: string;
  features: Feature[];
  activities: Activity[];
  categories: Category[];
  testimonial: Testimonial;
};

type ImageUrl = {
  _id: string;
  url: string;
};

type Feature = {
  _id: string;
  qty: string;
  name: string;
  imageUrl: string;
};

type Activity = {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
};

type Testimonial = {
  _id: string;
  imageUrl: string;
  name: string;
  rate: number;
  content: string;
  familyName: string;
  familyOccupation: string;
};

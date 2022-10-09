import type { Category } from "@/types/category";
import type Testimonial from "@/types/testimonial";

export type Property = {
  _id: string;
  name: string;
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
  categories: Category[];
  testimonial: Testimonial;
};

export type ImageUrl = {
  _id: string;
  url: string;
};

export type Feature = {
  _id: string;
  qty: number;
  name: string;
  imageUrl: string;
};

type Activity = {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
};

import type { Category } from "@/types";

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

type Testimonial = {
  _id: string;
  imageUrl: string;
  name: string;
  rate: number;
  content: string;
  familyName: string;
  familyOccupation: string;
};

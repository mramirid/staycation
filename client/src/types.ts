export type Category = {
  _id: string;
  name: string;
  items: CategoryItem[];
};

export type CategoryItem = {
  _id: string;
  name: string;
  imageUrl: string;
  country: string;
  city: string;
  isPopular: boolean;
};

export type Testimonial = {
  _id: string;
  imageUrl: string;
  name: string;
  rate: number;
  content: string;
  familyName: string;
  familyOccupation: string;
};

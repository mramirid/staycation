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

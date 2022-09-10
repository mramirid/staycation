import { model, Schema } from "mongoose";

interface IProperty {
  title: string;
  price: number;
  city: string;
  country: string;
  isPopular: boolean;
  description: string;
  images: { imageUrl: string }[];
  features: {
    name: string;
    quantity: number;
    iconUrl: string;
  }[];
  activities: {
    name: string;
    type: string;
    imageUrl: string;
    isPopular: boolean;
  }[];
}

const propertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      imageUrl: {
        type: String,
        required: true,
      },
    },
  ],
  features: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      iconUrl: {
        type: String,
        required: true,
      },
    },
  ],
  activities: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      isPopular: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Property = model("Property", propertySchema);
export default Property;

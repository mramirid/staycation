import { model, Schema, Types } from "mongoose";
import { MAX_PROPERTY_IMAGES } from "../lib/constants";
import Category from "./Category";

export interface IProperty {
  title: string;
  price: Types.Decimal128;
  city: string;
  country: string;
  isPopular: boolean;
  category: Types.ObjectId;
  description: string;
  imageUrls: string[];
  features: Types.DocumentArray<{
    name: string;
    quantity: number;
    iconUrl: string;
  }>;
  activities: Types.DocumentArray<{
    name: string;
    type: string;
    imageUrl: string;
    isPopular: boolean;
  }>;
}

const propertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Schema.Types.Decimal128,
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
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: Category,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String],
    maxlength: MAX_PROPERTY_IMAGES,
    required: true,
  },
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
        default: false,
      },
    },
  ],
});

const Property = model("Property", propertySchema);
export default Property;

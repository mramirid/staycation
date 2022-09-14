import { model, Schema, Types } from "mongoose";
import Category from "./Category";

interface IProperty {
  title: string;
  price: number;
  city: string;
  country: string;
  isPopular: boolean;
  category: Types.ObjectId;
  description: string;
  imageUrls: string[];
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
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: Category,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  features: {
    type: [
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
    default: [],
  },
  activities: {
    type: [
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
    default: [],
  },
});

const Property = model("Property", propertySchema);
export default Property;

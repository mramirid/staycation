import _ from "lodash";
import {
  HydratedDocument,
  isValidObjectId,
  model,
  Schema,
  Types,
} from "mongoose";
import validator from "validator";
import { category404Error, MAX_PROPERTY_IMAGES } from "../utils/constant";
import Category from "./Category";

export interface IProperty {
  title: string;
  price: Types.Decimal128;
  unit: string;
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

export type PropertyDoc = HydratedDocument<IProperty>;

const propertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true,
    validate: {
      validator: (v: unknown) => validator.isFloat(String(v), { min: 0 }),
      message: "The price must be a positive float",
    },
    transform: (v: Types.Decimal128) => _.toNumber(v),
  },
  unit: {
    type: String,
    trim: true,
    default: "night",
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
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
    validate: [
      {
        validator: (v: unknown) => isValidObjectId(v),
        message: "Invalid category id",
      },
      {
        validator: (v: unknown) =>
          Category.findById(v).orFail(category404Error),
      },
    ],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrls: {
    type: [{ type: String, required: true, trim: true }],
    validate: {
      validator: (v: unknown[]) => v.length === MAX_PROPERTY_IMAGES,
      message: `Please provide ${MAX_PROPERTY_IMAGES} images for the property`,
    },
  },
  features: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
        validate: {
          validator: (v: unknown) => validator.isInt(String(v)),
          message: "The feature quantity must be an integer",
        },
      },
      iconUrl: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  activities: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        required: true,
        trim: true,
      },
      imageUrl: {
        type: String,
        required: true,
        trim: true,
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

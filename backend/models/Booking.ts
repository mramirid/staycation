import { differenceInDays } from "date-fns";
import _ from "lodash";
import {
  HydratedDocument,
  isValidObjectId,
  Model,
  model,
  Schema,
  Types,
} from "mongoose";
import { property404Error } from "../utils/constant";
import Property from "./Property";

interface IBooking {
  startDate: Date;
  endDate: Date;
  duration: number;
  member: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  property: {
    current: Types.ObjectId;
    price: Types.Decimal128;
  };
  payment: {
    imageProofUrl: string;
    originBankName: string;
    accountHolderName: string;
    status: "Accepted" | "Rejected" | "Pending";
  };
}

interface IBookingVirtuals {
  invoiceId: string;
  dateRange: string;
  totalPrice: number;
  memberFullName: string;
}

export type BookingDoc = HydratedDocument<
  IBooking,
  Record<string, never>,
  IBookingVirtuals
>;

type BookingModel = Model<
  IBooking,
  Record<string, never>,
  Record<string, never>,
  IBookingVirtuals
>;

const bookingSchema = new Schema<
  IBooking,
  BookingModel,
  Record<string, never>,
  Record<string, never>,
  IBookingVirtuals
>(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      validate: {
        validator: function (this: BookingDoc, v: unknown) {
          const dateRangeDuration =
            differenceInDays(this.endDate, this.startDate) + 1;
          return v === dateRangeDuration;
        },
        message: "The duration does not match with the date range",
      },
    },
    member: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    property: {
      current: {
        type: Schema.Types.ObjectId,
        ref: Property,
        required: true,
        validate: [
          {
            validator: (v: unknown) => isValidObjectId(v),
            message: "Invalid category id",
          },
          {
            validator: (v: unknown) =>
              Property.findById(v).orFail(property404Error),
          },
        ],
      },
      price: {
        type: Schema.Types.Decimal128,
        required: true,
        min: 0,
      },
    },
    payment: {
      imageProofUrl: {
        type: String,
        required: true,
      },
      originBankName: {
        type: String,
        required: true,
      },
      accountHolderName: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Pending",
        enum: ["Accepted", "Rejected", "Pending"],
      },
    },
  },
  {
    virtuals: {
      invoiceId: {
        get() {
          return this.id.toUpperCase();
        },
      },
      dateRange: {
        get() {
          return new Intl.DateTimeFormat("en-US").formatRange(
            this.startDate,
            this.endDate
          );
        },
      },
      totalPrice: {
        get() {
          const subTotal = _.toNumber(this.property.price) * this.duration;
          const TAX_RATE = 10 / 100;
          const totalPrice = subTotal * TAX_RATE + subTotal;
          return totalPrice;
        },
      },
      memberFullName: {
        get() {
          return `${this.member.firstName} ${this.member.lastName}`;
        },
      },
    },
  }
);

const Booking = model("Booking", bookingSchema);
export default Booking;

import _ from "lodash";
import { HydratedDocument, Model, model, Schema, Types } from "mongoose";
import Bank from "./Bank";
import Property from "./Property";

interface IBooking {
  startDate: Date;
  endDate: Date;
  nights: number;
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
  bank: Types.ObjectId; // one-to-one referenced
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
  totalPrice: string;
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
>({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  nights: {
    type: Number,
    required: true,
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
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
    },
  },
  bank: {
    type: Schema.Types.ObjectId,
    ref: Bank,
    required: true,
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
    },
  },
});

bookingSchema.virtual("invoiceId").get(function (this: BookingDoc) {
  return this.id;
});

bookingSchema.virtual("dateRange").get(function (this: BookingDoc) {
  return new Intl.DateTimeFormat("en-US").formatRange(
    this.startDate,
    this.endDate
  );
});

bookingSchema.virtual("totalPrice").get(function (this: BookingDoc) {
  return this.nights * _.toNumber(this.property.price);
});

bookingSchema.virtual("memberFullName").get(function (this: BookingDoc) {
  return `${this.member.firstName} ${this.member.lastName}`;
});

const Booking = model("Booking", bookingSchema);
export default Booking;

import _ from "lodash";
import { HydratedDocument, Model, model, Schema, Types } from "mongoose";
import Bank from "./Bank";
import Member from "./Member";
import Property from "./Property";

export interface IBooking {
  startDate: Date;
  endDate: Date;
  nights: number;
  member: Types.ObjectId; // one-to-one referenced
  property: {
    current: Types.ObjectId;
    price: Types.Decimal128;
  };
  bank: Types.ObjectId; // one-to-one referenced
  payment: {
    imageProofUrl: string;
    originBankName: string;
    accountHolderName: string;
    status: "ACCEPTED" | "REJECTED" | "PENDING";
  };
}

interface IBookingVirtuals {
  invoiceId: string;
  dateRange: string;
  totalPrice: string;
}

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
    type: Schema.Types.ObjectId,
    ref: Member,
    required: true,
    index: true,
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
      default: "PENDING",
    },
  },
});

bookingSchema
  .virtual("invoiceId")
  .get(function (this: HydratedDocument<IBooking>) {
    return this.id;
  });

bookingSchema
  .virtual("dateRange")
  .get(function (this: HydratedDocument<IBooking>) {
    return new Intl.DateTimeFormat("en-US").formatRange(
      this.startDate,
      this.endDate
    );
  });

bookingSchema
  .virtual("getTotalPrice")
  .get(function (this: HydratedDocument<IBooking>) {
    return this.nights * _.toNumber(this.property.price);
  });

const Booking = model("Booking", bookingSchema);
export default Booking;

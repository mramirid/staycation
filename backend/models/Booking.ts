import { model, Schema, Types } from "mongoose";
import Bank from "./Bank";
import Member from "./Member";
import Property from "./Property";

export interface IBooking {
  startDate: Date;
  endDate: Date;
  nights: number;
  member: Types.ObjectId; // one-to-one referenced
  property: {
    data: Types.ObjectId;
    priceSnapshot: number;
  };
  banks: Types.ObjectId[]; // one-to-many referenced
  paymentProofUrl: string;
  originBankName: string;
  accountHolderName: string;
  status: "ACCEPTED" | "REJECTED" | "PENDING";
}

const bookingSchema = new Schema<IBooking>({
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
  },
  property: {
    data: {
      type: Schema.Types.ObjectId,
      ref: Property,
      required: true,
    },
    priceSnapshot: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  banks: [
    {
      type: Schema.Types.ObjectId,
      ref: Bank,
      required: true,
    },
  ],
  paymentProofUrl: {
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
    required: true,
    default: "PENDING",
  },
});

const Booking = model("Booking", bookingSchema);
export default Booking;

import { HydratedDocument, Model, model, Schema, Types } from "mongoose";
import Bank from "./Bank";
import Member from "./Member";
import Property from "./Property";

interface IBooking {
  startDate: Date;
  endDate: Date;
  nights: number;
  member: Types.ObjectId; // one-to-one referenced
  property: {
    current: Types.ObjectId;
    price: number;
  };
  banks: Types.ObjectId[]; // one-to-many referenced
  payment: {
    imageProofUrl: string;
    originBankName: string;
    accountHolderName: string;
    status: "ACCEPTED" | "REJECTED" | "PENDING";
  };
}

interface IBookingMethods {
  getInvoiceId(): string;
  getTotalPrice(): number;
}

type BookingModel = Model<IBooking, unknown, IBookingMethods>;

const bookingSchema = new Schema<IBooking, BookingModel, IBookingMethods>({
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

bookingSchema.methods.getInvoiceId = function (
  this: HydratedDocument<IBooking>
) {
  return this.id;
};

bookingSchema.methods.getTotalPrice = function (
  this: HydratedDocument<IBooking>
) {
  return this.nights * this.property.price;
};

const Booking = model("Booking", bookingSchema);
export default Booking;

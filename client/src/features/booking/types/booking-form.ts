import { type UseFormReturn } from "react-hook-form";
import { type InferType } from "yup";
import { type bookingSchema } from "../api/booking.schema";

export type BookingValues = InferType<typeof bookingSchema>;

export type BookingForm = UseFormReturn<BookingValues>;

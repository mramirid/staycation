import { isObject } from "lodash-es";
import { type UseFormReturn } from "react-hook-form";
import { mixed, object, string, type InferType } from "yup";
import "yup-phone";

const bookingInformationSchema = object({
  firstName: string().trim().required("First name is required"),
  lastName: string().trim().required("Last name is required"),
  email: string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: string()
    .phone("US", undefined, "Enter a valid phone number")
    .required("Phone number is required"),
});

const paymentSchema = object({
  paymentProof: mixed<File>()
    .test("Required", "You need to provide an image", (image) =>
      isObject(image)
    )
    .test(
      "Image Type",
      "Please upload an image",
      (image) => isObject(image) && image.type.includes("image")
    )
    .test(
      "Image Size",
      "The image size is too big",
      (image) => isObject(image) && image.size <= 2_000_000 // In bytes | 2 MB
    )
    .required(),
  originBankName: string().trim().required("Origin bank is required"),
  accountHolderName: string().trim().required("Sender name is required"),
});

export const bookingSchema = bookingInformationSchema
  .clone()
  .concat(paymentSchema);

export type BookingFieldValues = InferType<typeof bookingSchema>;

export type BookingForm = UseFormReturn<BookingFieldValues>;

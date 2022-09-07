import PROPERTY from "@/assets/data/property.data.json";
import { formatWithSuffix } from "@/utils/format";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fade } from "react-awesome-reveal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { object, string, type InferType } from "yup";
import "yup-phone";
import BOOKING_DATA from "../assets/booking.data.json";
import InputText from "./InputText";

export default function BookingInformation() {
  return (
    <div className="grid grid-cols-[26.25rem_min-content_26.25rem] gap-x-20 justify-center">
      <PropertyDetails />
      <div className="divider divider-horizontal w-fit before:w-1px after:w-1px m-0" />
      <Form />
    </div>
  );
}

function PropertyDetails() {
  const formattedNights = formatWithSuffix(BOOKING_DATA.nights, {
    singular: "night",
    plural: "nights",
  });

  return (
    <Fade delay={300} className="py-9">
      <>
        <figure>
          <img
            src={PROPERTY.imageUrls[0].url}
            alt={PROPERTY.name}
            style={{ height: "16.875rem", width: "100%" }}
          />
        </figure>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h5 className="text-xl text-secondary">{PROPERTY.name}</h5>
            <span className="text-light">
              {PROPERTY.city}, {PROPERTY.country}
            </span>
          </div>
          <div className="leading-7">
            <b className="text-semibold">
              ${BOOKING_DATA.nights * PROPERTY.price} USD
            </b>
            <span className="text-light"> per </span>
            <b className="text-semibold">{formattedNights}</b>
          </div>
        </div>
      </>
    </Fade>
  );
}

const bookingInfoSchema = object({
  firstName: string().trim().required("First name is required"),
  lastName: string().trim().required("Last name is required"),
  email: string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: string()
    .phone("Enter a valid phone number")
    .required("Phone number is required"),
});

type BookingInfoValues = InferType<typeof bookingInfoSchema>;

function Form() {
  const { register, handleSubmit, formState, control } =
    useForm<BookingInfoValues>({
      resolver: yupResolver(bookingInfoSchema),
      mode: "onChange",
    });

  const submit: SubmitHandler<BookingInfoValues> = (data) => {
    console.log("SUBMITTED:", data);
  };

  return (
    <Fade delay={600} className="py-9 max-w-xs">
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="first-name">First Name</label>
          <InputText
            id="first-name"
            type="text"
            containerClass="mt-2"
            {...register("firstName")}
            errorMessage={formState.errors.firstName?.message}
          />
        </div>

        <div>
          <label htmlFor="last-name">Last Name</label>
          <InputText
            id="last-name"
            type="text"
            containerClass="mt-2"
            {...register("lastName")}
            errorMessage={formState.errors.lastName?.message}
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <InputText
            id="email"
            type="email"
            containerClass="mt-2"
            {...register("email")}
            errorMessage={formState.errors.email?.message}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <InputText
            id="phone"
            type="tel"
            containerClass="mt-2"
            {...register("phone")}
            errorMessage={formState.errors.phone?.message}
          />
        </div>

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Fade>
  );
}

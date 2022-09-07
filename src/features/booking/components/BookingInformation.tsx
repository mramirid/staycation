import property from "@/features/detail-property/assets/data/item-details.json";
import { clx } from "@/utils/styling";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fade } from "react-awesome-reveal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { object, string, type SchemaOf } from "yup";
import "yup-phone";
import InputText from "./InputText";

const CHECKOUT = {
  duration: 2,
};

type BookingInformationProps = {
  className: string;
};

export default function BookingInformation(props: BookingInformationProps) {
  return (
    <Fade
      className={clx(
        "grid grid-cols-[26.25rem_min-content_26.25rem] gap-x-20 justify-center",
        props.className
      )}
    >
      <>
        <PropertyDetails />
        <div className="divider divider-horizontal w-fit before:w-1px after:w-1px m-0" />
        <Form />
      </>
    </Fade>
  );
}

function PropertyDetails() {
  return (
    <Fade delay={300} className="py-9">
      <figure className="img-wrapper">
        <img
          src={property.imageUrls[0].url}
          alt={property.name}
          style={{ height: "16.875rem" }}
        />
        <figcaption className="mt-4 flex justify-between items-center">
          <div>
            <h5 className="text-xl text-secondary">{property.name}</h5>
            <span className="text-light">
              {property.city}, {property.country}
            </span>
          </div>
          <div className="leading-7">
            <b className="text-semibold">
              ${CHECKOUT.duration * property.price} USD
            </b>
            <span className="text-light"> per </span>
            <b className="text-semibold">
              {CHECKOUT.duration} {property.unit}
              {CHECKOUT.duration > 1 ? "s" : ""}
            </b>
          </div>
        </figcaption>
      </figure>
    </Fade>
  );
}

const bookingFieldSchema: SchemaOf<BookingFieldValues> = object({
  firstName: string().trim().required("First name is required"),
  lastName: string().trim().required("Last name is required"),
  email: string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: string()
    .phone("Enter a valid phone number")
    .required("Phone number is required"),
});

function Form() {
  const { register, handleSubmit, formState, control } =
    useForm<BookingFieldValues>({
      resolver: yupResolver(bookingFieldSchema),
      mode: "onChange",
    });

  const submit: SubmitHandler<BookingFieldValues> = (data) => {
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

type BookingFieldValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

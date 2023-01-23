import InputText from "@/components/forms/InputText";
import { type Property } from "@/features/property";
import { formatCountSuffix } from "@/utils/format";
import { Fade } from "react-awesome-reveal";
import { useFormContext } from "react-hook-form";
import "yup-phone";
import classes from "../booking-step-content.module.scss";
import type { BookingForm } from "../../lib/schema";

type ContentProps = {
  duration: number;
  property: Property;
};

export function BookingInformationContent(props: ContentProps) {
  return (
    <div className={classes.bookingStepContent}>
      <PropertyDetails
        className={classes.bookingStepContent__details}
        duration={props.duration}
        property={props.property}
      />
      <div className={classes.bookingStepContent__divider} />
      <Form className={classes.bookingStepContent__form} />
    </div>
  );
}

type PropertyDetailsProps = ContentProps & { className: string };

function PropertyDetails(props: PropertyDetailsProps) {
  const firstImageUrl =
    import.meta.env.VITE_CMS_BASE_URL + props.property.imageUrls.at(0);

  const formattedDuration = formatCountSuffix(props.duration, {
    singular: "night",
    plural: "nights",
  });

  return (
    <Fade delay={300} className={props.className} triggerOnce>
      <>
        <figure className="img-wrapper lg:h-[16.875rem] aspect-[14/9]">
          <img src={firstImageUrl} alt={props.property.title} />
        </figure>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h5 className="text-xl text-secondary">{props.property.title}</h5>
            <span className="text-light">
              {props.property.city}, {props.property.country}
            </span>
          </div>
          <div className="leading-7">
            <b className="text-semibold">
              ${props.duration * props.property.price} USD
            </b>
            <span className="text-light"> per </span>
            <b className="text-semibold">{formattedDuration}</b>
          </div>
        </div>
      </>
    </Fade>
  );
}

type FormProps = {
  className: string;
};

function Form({ className }: FormProps) {
  const form: BookingForm = useFormContext();

  return (
    <Fade className={className} delay={600} triggerOnce>
      <form className="flex flex-col gap-y-5">
        <div>
          <label htmlFor="first-name">First Name</label>
          <InputText
            id="first-name"
            type="text"
            containerClass="mt-2"
            {...form.register("firstName")}
            errorMessage={form.formState.errors.firstName?.message}
          />
        </div>

        <div>
          <label htmlFor="last-name">Last Name</label>
          <InputText
            id="last-name"
            type="text"
            containerClass="mt-2"
            {...form.register("lastName")}
            errorMessage={form.formState.errors.lastName?.message}
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <InputText
            id="email"
            type="email"
            containerClass="mt-2"
            {...form.register("email")}
            errorMessage={form.formState.errors.email?.message}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <InputText
            id="phone"
            type="tel"
            containerClass="mt-2"
            {...form.register("phone")}
            errorMessage={form.formState.errors.phone?.message}
          />
        </div>
      </form>
    </Fade>
  );
}

import PROPERTY from "@/assets/data/property.data.json";
import InputText from "@/components/forms/InputText";
import { formatCountSuffix } from "@/utils/format";
import { Fade } from "react-awesome-reveal";
import { useFormContext } from "react-hook-form";
import "yup-phone";
import type { BookingForm } from "../../types/booking-form";

type ContentProps = {
  duration: number;
};

export function BookingInformationContent(props: ContentProps) {
  return (
    <div className="grid grid-cols-[26.25rem_min-content_26.25rem] gap-x-20 justify-center">
      <PropertyDetails {...props} />
      <div className="divider divider-horizontal w-fit before:w-1px after:w-1px m-0" />
      <Form />
    </div>
  );
}

function PropertyDetails(props: ContentProps) {
  const formattedDuration = formatCountSuffix(props.duration, {
    singular: "night",
    plural: "nights",
  });

  return (
    <Fade delay={300} className="py-9" triggerOnce>
      <>
        <figure>
          <img
            src={PROPERTY.imageUrls[0].url}
            alt={PROPERTY.title}
            style={{ height: "16.875rem", width: "100%" }}
          />
        </figure>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h5 className="text-xl text-secondary">{PROPERTY.title}</h5>
            <span className="text-light">
              {PROPERTY.city}, {PROPERTY.country}
            </span>
          </div>
          <div className="leading-7">
            <b className="text-semibold">
              ${props.duration * PROPERTY.price} USD
            </b>
            <span className="text-light"> per </span>
            <b className="text-semibold">{formattedDuration}</b>
          </div>
        </div>
      </>
    </Fade>
  );
}

function Form() {
  const form: BookingForm = useFormContext();

  return (
    <Fade className="py-9 max-w-xs" delay={600} triggerOnce>
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

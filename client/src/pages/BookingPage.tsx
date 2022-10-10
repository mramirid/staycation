import Header from "@/components/Header";
import Main from "@/components/Main";
import {
  Content,
  Controller,
  Meta,
  Numberings,
  Stepper,
  type Steps,
} from "@/components/stepper";
import {
  BookingInformationContent,
  BookingInformationController,
  bookingSchema,
  CompletedContent,
  CompletedController,
  getBanks,
  PaymentContent,
  PaymentController,
  type Bank,
  type BookingLocationState,
  type BookingValues,
} from "@/features/booking";
import { getProperty, type Property } from "@/features/property";
import type { StatefulLocation } from "@/types/react-router";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { isNull } from "lodash-es";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  useLoaderData,
  useLocation,
  type LoaderFunctionArgs,
} from "react-router-dom";

type StepNames = "bookingInformation" | "payment" | "completed";

export default function BookingPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  const { property, banks } = useLoaderData() as LoaderData;

  const form = useForm<BookingValues>({
    resolver: yupResolver(bookingSchema),
    mode: "onChange",
  });

  const submitBooking = async (data: BookingValues) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve(undefined);
      }, 2000);
    });
  };

  const location = useLocation() as StatefulLocation<BookingLocationState>;
  if (isNull(location.state)) {
    throw new Error("The booking process seems incorrect. Unable to continue.");
  }
  const { startBookingData } = location.state;

  const steps: Steps<StepNames> = {
    bookingInformation: {
      title: "Booking Information",
      description: "Please fill up the blank fields below",
      content: (
        <BookingInformationContent
          duration={startBookingData.duration}
          property={property}
        />
      ),
      controller: <BookingInformationController />,
    },
    payment: {
      title: "Payment",
      description: "Kindly follow the instructions below",
      content: (
        <PaymentContent
          duration={startBookingData.duration}
          propertyPrice={property.price}
          banks={banks}
        />
      ),
      controller: <PaymentController onSubmitBooking={submitBooking} />,
    },
    completed: {
      title: "Yay! Completed",
      description: "",
      content: <CompletedContent />,
      controller: <CompletedController />,
    },
  };

  return (
    <>
      <Header logoOnly />
      <Main>
        <Stepper<StepNames> steps={steps} initialStepName="bookingInformation">
          {(steps, currentStepName, toPrevStep, toNextStep) => (
            <FormProvider {...form}>
              <Numberings
                className="my-50px"
                steps={steps}
                currentStepName={currentStepName}
              />
              <Meta
                className="my-50px"
                steps={steps}
                currentStepName={currentStepName}
              />
              <Content
                className="my-50px"
                steps={steps}
                currentStepName={currentStepName}
              />
              <Controller
                className="my-50px"
                steps={steps}
                currentStepName={currentStepName}
                toPrevStep={toPrevStep}
                toNextStep={toNextStep}
              />
            </FormProvider>
          )}
        </Stepper>
      </Main>
      {import.meta.env.DEV && <DevTool control={form.control} />}
    </>
  );
}

export async function loader(args: LoaderFunctionArgs): Promise<LoaderData> {
  const { id: propertyId } = args.params;

  const [property, banks] = await Promise.all([
    getProperty(propertyId ?? ""),
    getBanks(),
  ]);

  return { property, banks };
}

type LoaderData = {
  property: Property;
  banks: Bank[];
};

import Header from "@/components/Header";
import Main from "@/components/Main";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { isNull, isUndefined } from "lodash-es";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, type Location } from "react-router-dom";
import { bookingSchema } from "../lib/booking.schema";
import type { BookingValues, StartBookingData } from "../types/booking-form";
import type { Steps } from "../types/steps";
import {
  BookingInformationContent,
  BookingInformationController,
} from "./booking-information";
import { CompletedContent, CompletedController } from "./completed";
import { PaymentContent, PaymentController } from "./payment";
import {
  Content,
  Controller as StepperController,
  Meta,
  Numberings,
  Stepper,
} from "./stepper";

type StepNames = "bookingInformation" | "payment" | "completed";

interface BookingLocation extends Location {
  state: { startBookingData?: StartBookingData } | null;
}

export default function BookingPage() {
  useEffect(() => window.scrollTo(0, 0), []);

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

  const { state } = useLocation() as BookingLocation;
  if (isNull(state) || isUndefined(state.startBookingData)) {
    throw new Error("The booking process is incorrect. Unable to continue.");
  }

  const steps: Steps<StepNames> = {
    bookingInformation: {
      title: "Booking Information",
      description: "Please fill up the blank fields below",
      content: (
        <BookingInformationContent duration={state.startBookingData.duration} />
      ),
      controller: <BookingInformationController />,
    },
    payment: {
      title: "Payment",
      description: "Kindly follow the instructions below",
      content: <PaymentContent />,
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
              <StepperController
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

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
  bookProperty,
  CompletedContent,
  CompletedController,
  getBanks,
  PaymentContent,
  PaymentController,
  type Bank,
  type BookingLocationState,
  type BookingValues,
  type SubmitBookingHandler,
} from "@/features/booking";
import { getProperty, type Property } from "@/features/property";
import type { StatefulLocation } from "@/types/react-router";
import { getErrorMessage, isResponse422 } from "@/utils/error";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { isNull, isObject } from "lodash-es";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  useLoaderData,
  useLocation,
  type LoaderFunctionArgs,
} from "react-router-dom";

const bookingProcessError = new Error(
  "The booking process seems incorrect. Unable to continue. Please try again from the beginning."
);

export default function BookingPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  const { property, banks } = useLoaderData() as LoaderData;

  const location = useLocation() as StatefulLocation<BookingLocationState>;
  if (isNull(location.state)) {
    throw bookingProcessError;
  }
  const { startBookingData } = location.state;

  const form = useForm<BookingValues>({
    resolver: yupResolver(bookingSchema),
    mode: "onChange",
  });

  const showValidationErrors = (errors: ValidationErrorData["errors"]) => {
    if (
      isObject(errors["property.current"]) ||
      isObject(errors.startDate) ||
      isObject(errors.endDate) ||
      isObject(errors.duration) ||
      isObject(errors["property.price"])
    ) {
      alert(getErrorMessage(bookingProcessError));
    }

    if (isObject(errors["member.firstName"])) {
      form.setError("firstName", {
        type: "onChange",
        message: errors["member.firstName"].message,
      });
    }
    if (isObject(errors["member.lastName"])) {
      form.setError("lastName", {
        type: "onChange",
        message: errors["member.lastName"].message,
      });
    }
    if (isObject(errors["member.email"])) {
      form.setError("email", {
        type: "onChange",
        message: errors["member.email"].message,
      });
    }
    if (isObject(errors["member.phone"])) {
      form.setError("phone", {
        type: "onChange",
        message: errors["member.phone"].message,
      });
    }
    if (isObject(errors["payment.imageProofUrl"])) {
      form.setError("paymentProof", {
        type: "onChange",
        message: errors["payment.imageProofUrl"].message,
      });
    }
    if (isObject(errors["payment.originBankName"])) {
      form.setError("originBankName", {
        type: "onChange",
        message: errors["payment.originBankName"].message,
      });
    }
    if (isObject(errors["payment.accountHolderName"])) {
      form.setError("accountHolderName", {
        type: "onChange",
        message: errors["payment.accountHolderName"].message,
      });
    }
  };

  const submitBooking: SubmitBookingHandler = async (data, toNextStep) => {
    const formData = new FormData();
    formData.append("propertyId", property._id);
    formData.append("startDate", startBookingData.startDate.toISOString());
    formData.append("endDate", startBookingData.endDate.toISOString());
    formData.append("duration", startBookingData.duration.toString());
    formData.append("price", property.price.toString());
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("payment-proof", data.paymentProof, data.paymentProof.name);
    formData.append("originBankName", data.originBankName);
    formData.append("accountHolderName", data.accountHolderName);

    try {
      await bookProperty(formData);
      toNextStep();
    } catch (maybeError) {
      if (isResponse422(maybeError)) {
        const data: ValidationErrorData = await maybeError.json();
        showValidationErrors(data.errors);
        return;
      }
      alert(getErrorMessage(maybeError));
    }
  };

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

type StepNames = "bookingInformation" | "payment" | "completed";

type ValidationErrorData = {
  errors: Partial<{
    "payment.accountHolderName": {
      message: "Path `payment.accountHolderName` is required.";
    };
    "payment.originBankName": {
      message: "Path `payment.originBankName` is required.";
    };
    "payment.imageProofUrl": {
      message: "Path `payment.imageProofUrl` is required.";
    };
    "property.price": {
      message: "Path `property.price` is required.";
    };
    "property.current": {
      message: "Path `property.current` is required.";
    };
    "member.phone": {
      message: "Path `member.phone` is required.";
    };
    "member.email": {
      message: "Path `member.email` is required.";
    };
    "member.lastName": {
      message: "Path `member.lastName` is required.";
    };
    "member.firstName": {
      message: "Path `member.firstName` is required.";
    };
    startDate: {
      message: "Path `startDate` is required.";
    };
    endDate: {
      message: "Path `endDate` is required.";
    };
    duration: {
      message: "Path `duration` is required.";
    };
  }>;
};

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

import Header from "@/components/Header";
import Main from "@/components/Main";
import { useEffect } from "react";
import BookingInformation from "./BookingInformation";
import Completed from "./Completed";
import Payment from "./Payment";
import Stepper, { Content, Meta, Numberings, type Steps } from "./Stepper";

const steps: Steps = {
  bookingInformation: {
    title: "Booking Information",
    description: "Please fill up the blank fields below",
    content: <BookingInformation />,
  },
  payment: {
    title: "Payment",
    description: "Kindly follow the instructions below",
    content: <Payment />,
  },
  completed: {
    title: "Yay! Completed",
    description: "",
    content: <Completed />,
  },
};

export default function BookingPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <Header logoOnly />
      <Main>
        <Stepper steps={steps} initialStepName="completed">
          {(steps, currentStepName) => (
            <>
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
            </>
          )}
        </Stepper>
      </Main>
    </>
  );
}

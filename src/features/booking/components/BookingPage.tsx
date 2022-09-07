import Header from "@/components/Header";
import Main from "@/components/Main";
import BookingInformation from "./BookingInformation";
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
    content: <></>,
  },
};

export default function BookingPage() {
  return (
    <>
      <Header logoOnly />
      <Main>
        <Stepper steps={steps} initialStepName="payment">
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

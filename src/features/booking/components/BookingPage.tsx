import Header from "@/components/Header";
import Main from "@/components/Main";
import Stepper, { type Steps } from "./Stepper";

const steps: Steps = {
  bookingInformation: {
    title: "Booking Information",
    description: "Please fill up the blank fields below",
    content: <></>,
  },
  payment: {
    title: "Payment",
    description: "Kindly follow the instructions below",
    content: <></>,
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
        <Stepper steps={steps} initialStepName="bookingInformation">
          {() => <h1>Hello World</h1>}
        </Stepper>
      </Main>
    </>
  );
}

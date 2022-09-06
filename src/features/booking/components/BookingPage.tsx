import Header from "@/components/Header";
import Main from "@/components/Main";
import BookingInformation from "./BookingInformation";
import Stepper, { Meta, Numberings, type Steps } from "./Stepper";

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
          {(steps, currentStepName) => {
            // console.log("steps:", steps);
            // console.log("currentStepName:", currentStepName);

            return (
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
                <BookingInformation className="my-50px" />
              </>
            );
          }}
        </Stepper>
      </Main>
    </>
  );
}

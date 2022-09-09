import { isUndefined } from "lodash-es";
import { Fade } from "react-awesome-reveal";
import { useFormContext } from "react-hook-form";
import type { BookingForm, BookingValues } from "../../types/booking-form";
import { useController } from "../stepper";

type Props = {
  onSubmitBooking: (data: BookingValues) => Promise<void>;
};

export function PaymentController(props: Props) {
  const form: BookingForm = useFormContext();

  const paymentProof = form.getFieldState("paymentProof", form.formState);
  const originBank = form.getFieldState("originBank", form.formState);
  const senderName = form.getFieldState("senderName", form.formState);

  const areInputsValid =
    paymentProof.isDirty &&
    isUndefined(paymentProof.error) &&
    originBank.isDirty &&
    isUndefined(originBank.error) &&
    senderName.isDirty &&
    isUndefined(senderName.error);

  const controller = useController();

  const submitBooking = async (data: BookingValues) => {
    if (areInputsValid) {
      await props.onSubmitBooking(data);
      controller.toNextStep();
    }
  };

  return (
    <>
      {areInputsValid && (
        <Fade triggerOnce direction="down">
          <button
            className="app-btn app-btn-primary btn-block"
            type="button"
            onClick={form.handleSubmit(submitBooking)}
          >
            Continue to Book
          </button>
        </Fade>
      )}
      <button
        className="app-btn app-btn-light btn-block"
        onClick={controller.toPrevStep}
      >
        Cancel
      </button>
    </>
  );
}

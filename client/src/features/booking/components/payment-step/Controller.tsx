import { useController } from "@/components/stepper";
import { isUndefined } from "lodash-es";
import { Fade } from "react-awesome-reveal";
import { useFormContext } from "react-hook-form";
import type { BookingForm, BookingValues } from "../../types/booking-form";

type Props = {
  onSubmitBooking: (data: BookingValues) => Promise<boolean>;
};

export function PaymentController(props: Props) {
  const form: BookingForm = useFormContext();

  const paymentProof = form.getFieldState("paymentProof", form.formState);
  const originBankName = form.getFieldState("originBankName", form.formState);
  const accountHolderName = form.getFieldState(
    "accountHolderName",
    form.formState
  );

  const areInputsValid =
    paymentProof.isDirty &&
    isUndefined(paymentProof.error) &&
    originBankName.isDirty &&
    isUndefined(originBankName.error) &&
    accountHolderName.isDirty &&
    isUndefined(accountHolderName.error);

  const controller = useController();

  const submitBooking = async (data: BookingValues) => {
    if (!areInputsValid) {
      return;
    }

    const isSuccess = await props.onSubmitBooking(data);
    if (!isSuccess) {
      return;
    }

    controller.toNextStep();
  };

  return (
    <>
      {areInputsValid && (
        <Fade triggerOnce direction="down">
          <button
            className="app-btn app-btn-primary btn-block"
            type="button"
            onClick={form.handleSubmit(submitBooking)}
            disabled={form.formState.isSubmitting}
          >
            Continue to Book
          </button>
        </Fade>
      )}
      <button
        className="app-btn app-btn-light btn-block"
        onClick={controller.toPrevStep}
      >
        Back
      </button>
    </>
  );
}

import { useController } from "@/components/stepper";
import { clx } from "@/utils/styling";
import { isUndefined } from "lodash-es";
import { Fade } from "react-awesome-reveal";
import { useFormContext } from "react-hook-form";
import type { BookingFieldValues, BookingForm } from "../../lib/schema";

type Props = {
  onSubmitBooking: SubmitBookingHandler;
};

export type SubmitBookingHandler = (
  data: BookingFieldValues,
  toNextStep: () => void
) => Promise<void>;

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

  const submitBooking = async (data: BookingFieldValues) => {
    if (areInputsValid) {
      await props.onSubmitBooking(data, controller.toNextStep);
    }
  };

  return (
    <>
      {areInputsValid && (
        <Fade triggerOnce direction="down">
          <button
            className={clx("app-btn app-btn-primary btn-block", {
              loading: form.formState.isSubmitting,
            })}
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
        Back
      </button>
    </>
  );
}

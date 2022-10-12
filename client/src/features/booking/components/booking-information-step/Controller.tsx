import { useController } from "@/components/stepper";
import { isUndefined } from "lodash-es";
import { Fade } from "react-awesome-reveal";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import type { BookingForm } from "../../lib/schema";

export function BookingInformationController() {
  const form: BookingForm = useFormContext();

  const firstName = form.getFieldState("firstName", form.formState);
  const lastName = form.getFieldState("lastName", form.formState);
  const email = form.getFieldState("email", form.formState);
  const phone = form.getFieldState("phone", form.formState);

  const areInputsValid =
    firstName.isDirty &&
    isUndefined(firstName.error) &&
    lastName.isDirty &&
    isUndefined(lastName.error) &&
    email.isDirty &&
    isUndefined(email.error) &&
    phone.isDirty &&
    isUndefined(phone.error);

  const controller = useController();

  const handleContinue = async () => {
    if (areInputsValid) {
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
            onClick={handleContinue}
          >
            Continue to Payment
          </button>
        </Fade>
      )}
      <Link className="app-btn app-btn-light btn-block" to=".." replace>
        Cancel
      </Link>
    </>
  );
}

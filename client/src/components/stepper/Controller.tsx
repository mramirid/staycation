import { createContext } from "@/utils/context";
import { clx } from "@/utils/styling";
import { Fade } from "react-awesome-reveal";
import { type StepProps } from ".";

type ControllerFunctions = {
  toPrevStep: () => void;
  toNextStep: () => void;
};

const [useController, ControllerProvider] =
  createContext<ControllerFunctions>();

export { useController };

export function Controller(props: StepProps & ControllerFunctions) {
  return (
    <Fade
      className={clx(
        "flex flex-col mx-auto w-[18.75rem] gap-y-5",
        props.className
      )}
      triggerOnce
    >
      <ControllerProvider
        value={{ toPrevStep: props.toPrevStep, toNextStep: props.toNextStep }}
      >
        {props.steps[props.currentStepName].controller}
      </ControllerProvider>
    </Fade>
  );
}

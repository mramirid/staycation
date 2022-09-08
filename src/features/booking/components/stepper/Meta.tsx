import { clx } from "@/utils/styling";
import { Fade } from "react-awesome-reveal";
import type { StepContentProps } from "../../types/steps";

export function Meta(props: StepContentProps) {
  const currentStep = props.steps[props.currentStepName];

  return (
    <Fade
      delay={300}
      className={clx("text-center", props.className)}
      triggerOnce
    >
      <>
        <h1 className="font-semibold text-4xl">{currentStep.title}</h1>
        <p className="text-light text-lg mt-1">{currentStep.description}</p>
      </>
    </Fade>
  );
}

import { Fade } from "react-awesome-reveal";
import type { StepContentProps } from "../../types/steps";

export function Content(props: StepContentProps) {
  return (
    <Fade className={props.className} triggerOnce>
      {props.steps[props.currentStepName].content}
    </Fade>
  );
}

import { Fade } from "react-awesome-reveal";
import { type StepProps } from ".";

export function Content(props: StepProps) {
  return (
    <Fade className={props.className} triggerOnce>
      {props.steps[props.currentStepName].content}
    </Fade>
  );
}

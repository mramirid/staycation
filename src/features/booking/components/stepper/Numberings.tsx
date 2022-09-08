import { clx } from "@/utils/styling";
import { Fade } from "react-awesome-reveal";
import type { StepContentProps } from "../../types/steps";
import "./Numberings.scss";

export function Numberings(props: StepContentProps) {
  const stepNames = Object.keys(props.steps);

  return (
    <Fade className={props.className} triggerOnce>
      <ol className="Numberings">
        {stepNames.map((stepName, i) => {
          const number = i + 1;

          if (number === stepNames.length) {
            return null;
          }
          return (
            <li
              className={clx({ active: stepName === props.currentStepName })}
              key={i}
            >
              {number}
            </li>
          );
        })}
      </ol>
    </Fade>
  );
}

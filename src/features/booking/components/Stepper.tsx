import { clx } from "@/utils/styling";
import { isEmpty, isString } from "lodash-es";
import { useState, type ReactNode } from "react";
import { Fade } from "react-awesome-reveal";
import "./Stepper.scss";

type StepperProps = {
  steps: Steps;
  initialStepName?: string;
  children: (
    steps: Steps,
    currentStepName: string,
    toPrevStep: () => void,
    toNextStep: () => void
  ) => JSX.Element;
};

export type Steps = {
  [stepName: string]: Step;
};

type Step = {
  title: string;
  description: string;
  content: JSX.Element;
};

export default function Stepper(props: StepperProps) {
  if (isEmpty(props.steps)) {
    throw new TypeError("Prop steps cannot be an empty object!");
  }

  const stepNames = Object.keys(props.steps);

  const [currentStepName, setCurrentStepName] = useState(
    isString(props.initialStepName) &&
      stepNames.indexOf(props.initialStepName) >= 0
      ? props.initialStepName
      : stepNames[0]
  );

  const totalSteps = stepNames.length;
  const indexStep = isString(currentStepName)
    ? stepNames.indexOf(currentStepName)
    : -1;

  const toPrevStep = () => {
    if (indexStep > 0) {
      setCurrentStepName(stepNames[indexStep - 1]);
    }
  };

  const toNextStep = () => {
    if (indexStep < totalSteps) {
      setCurrentStepName(stepNames[indexStep + 1]);
    }
  };

  return props.children(props.steps, currentStepName, toPrevStep, toNextStep);
}

type StepContentProps = {
  steps: Steps;
  currentStepName: string;
  className: string;
};

export function Numberings(props: StepContentProps) {
  const stepNames = Object.keys(props.steps);

  return (
    <Fade className={props.className}>
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

export function Meta(props: StepContentProps) {
  const currentStep = props.steps[props.currentStepName];

  return (
    <Fade delay={300} className={clx("text-center", props.className)}>
      <>
        <h1 className="font-semibold text-4xl">{currentStep.title}</h1>
        <p className="text-light text-lg mt-1">{currentStep.description}</p>
      </>
    </Fade>
  );
}

export function Content({ steps, currentStepName }: StepContentProps) {
  return <Fade>{steps[currentStepName].content}</Fade>;
}

type ControllerProps = {
  children: ReactNode;
};

export function Controller(props: ControllerProps) {
  return (
    <Fade>
      <section className="flex justify-center">{props.children}</section>
    </Fade>
  );
}

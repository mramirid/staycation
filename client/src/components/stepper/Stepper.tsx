import { isEmpty, isString } from "lodash-es";
import { useState } from "react";
import { type Steps } from ".";

type StepperProps<T extends string> = {
  steps: Steps<T>;
  initialStepName?: T;
  children: (
    steps: Steps<T>,
    currentStepName: T,
    toPrevStep: () => void,
    toNextStep: () => void
  ) => JSX.Element;
};

export function Stepper<T extends string>(props: StepperProps<T>) {
  if (isEmpty(props.steps)) {
    throw new TypeError("Prop steps cannot be an empty object!");
  }

  const stepNames = Object.keys(props.steps) as T[];

  const [currentStepName, setCurrentStepName] = useState<T>(
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

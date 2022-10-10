export { Content } from "./Content";
export { Controller, useController } from "./Controller";
export { Meta } from "./Meta";
export { Numberings } from "./Numberings";
export { Stepper } from "./Stepper";

export type Steps<T extends string> = {
  [stepName in T]: {
    title: string;
    description: string;
    content: JSX.Element;
    controller: JSX.Element;
  };
};

export type StepProps = {
  steps: Steps<string>;
  currentStepName: string;
  className: string;
};

export type StepContentProps = {
  steps: Steps<string>;
  currentStepName: string;
  className: string;
};

export type Steps<T extends string> = {
  [stepName in T]: {
    title: string;
    description: string;
    content: JSX.Element;
    controller: JSX.Element;
  };
};

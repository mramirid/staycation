import type { Location, NavigateOptions, To } from "react-router-dom";

export interface StatefulLocation<State> extends Omit<Location, "state"> {
  state: State | null;
}

export interface StatefulNavigate<State> {
  (to: To, options: StatefulNavigateOptions<State>): void;
}

interface StatefulNavigateOptions<State>
  extends Omit<NavigateOptions, "state"> {
  state: State;
}

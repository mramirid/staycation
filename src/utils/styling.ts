import classNames, { type Argument } from "classnames";

export function clx(...args: Argument[]) {
  return classNames(args);
}

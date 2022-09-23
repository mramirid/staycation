import _ from "lodash";
import * as format from "../utils/format";

export type UserSession = {
  id: string;
  username: string;
};

export type AppLocals = {
  _: typeof _;
  format: typeof format;
  user?: UserSession;
};

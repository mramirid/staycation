import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import _, { isObject, isUndefined } from "lodash";
import passport from "passport";
import { Strategy } from "passport-local";
import User, { UserDoc } from "../models/User";
import { AlertStatuses, setAlert } from "../utils/alert";
import { toError } from "../utils/error";

const localStrategy = new Strategy(async (username, password, done) => {
  let user: UserDoc | null;

  try {
    user = await User.findOne({ username });
  } catch (maybeError) {
    done(toError(maybeError));
    return;
  }

  if (_.isNull(user)) {
    done(undefined, undefined, { message: "Username not found!" });
    return;
  }

  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatch) {
    done(undefined, undefined, { message: "Password does not match!" });
    return;
  }

  done(undefined, user);
});
passport.use(localStrategy);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserDoc {}
  }
}

passport.serializeUser<string>((user: UserDoc, done) => {
  process.nextTick(() => {
    done(undefined, user.id);
  });
});

passport.deserializeUser((userId: string, done) => {
  process.nextTick(async () => {
    try {
      const user = await User.findById(userId).orFail(
        new Error("User not found!")
      );
      done(undefined, user);
    } catch (maybeError) {
      done(toError(maybeError));
    }
  });
});

export { passport };

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isObject(req.user)) {
    next();
    return;
  }

  setAlert(req, {
    message: "You are not authenticated. Please login again to continue.",
    status: AlertStatuses.Error,
  });
  res.redirect("/admin/login");
}

export function isNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isUndefined(req.user)) {
    next();
    return;
  }

  setAlert(req, {
    message: "You have been authenticated. No need to login again.",
    status: AlertStatuses.Info,
  });
  res.redirect("/admin/dashboard");
}

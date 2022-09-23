import { NextFunction, Request, Response } from "express";
import { isObject, isUndefined } from "lodash";
import { AppLocals } from "../../lib/types";
import { AlertStatuses, setAlert } from "../../utils/alert";

export function isAuthenticated(
  req: Request,
  res: Response<unknown, AppLocals>,
  next: NextFunction
) {
  if (isObject(req.session.user)) {
    res.locals.user = req.session.user;
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
  if (isUndefined(req.session.user)) {
    next();
    return;
  }

  setAlert(req, {
    message: "You have been authenticated. No need to login again.",
    status: AlertStatuses.Info,
  });
  res.redirect("/admin/dashboard");
}

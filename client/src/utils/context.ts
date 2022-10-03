/**
 * I really want you to check this out!:
 *   https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052
 */

import React from "react";

export function createContext<T>() {
  const ctx = React.createContext<T | undefined>(undefined);
  function useContext() {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useContext, ctx.Provider] as const;
}

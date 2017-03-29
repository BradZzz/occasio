// @flow
import type { Action } from "../types/actions";

export type IncrementAction = Action<"INCREMENT">;
export type DecrementAction = Action<"DECREMENT">;
export type IncrementAsyncAction = Action<"INCREMENT_ASYNC">;

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const INCREMENT_ASYNC = "INCREMENT_ASYNC";

export const increment = (): IncrementAction => ({ type: INCREMENT });
export const decrement = (): DecrementAction => ({ type: DECREMENT });
export const incrementAsync = (): IncrementAsyncAction => ({ type: INCREMENT_ASYNC });

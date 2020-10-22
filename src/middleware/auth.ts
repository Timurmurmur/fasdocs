import { Middleware, Store, Dispatch, MiddlewareAPI } from "redux";
import { Action, State } from "../../App";

export const authMiddleware: Middleware<State, State, Dispatch<Action>> = (
    store: MiddlewareAPI<Dispatch<Action>>
  ): ((next: Dispatch<Action>) => (action: Action) => Action) => (
    next: Dispatch<Action>
  ): ((action: Action) => Action) => (action: Action): Action => {
    if (action.type !== '@auth/LOGIN' && action.type !== '@auth/REFRESH_TOKEN_START' && action.type !== '@auth/REFRESH_TOKEN_END') {
        const { data, cachedUserData } = store.getState().auth;
        if (data?.exp < new Date().getTime()) {
          store.dispatch({
            type: "@auth/REFRESH_TOKEN_START",
            refreshToken: data.refreshToken
          })
        }
    }
    return next(action);
  };
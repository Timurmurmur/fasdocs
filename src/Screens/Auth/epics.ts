import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { FuncEpic } from "../../common/types";
import { LOGIN, LoginAction, loginError, loginSuccess, RefreshTokenStartAction, REFRESH_TOKEN_START, refreshTokenEnd } from "./actions";
import { writeLog } from "../../Components/Logger/actions";

const loginEpic: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(LOGIN),
    switchMap(({ username, password }: LoginAction) => {
      return from(deps.authDataProvider.login(username, password)).pipe(
        switchMap((user) => {
          return of(loginSuccess(user));
        }),
        catchError(e => {
          return of(loginError(e), writeLog(e));
        })
      );
    })
  );
};

const refreshEpic: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(REFRESH_TOKEN_START),
    switchMap(({ refreshToken }: RefreshTokenStartAction) => {
      return from(deps.authDataProvider.refresh(refreshToken)).pipe(
        switchMap((user) => {
          return of(refreshTokenEnd(user));
        }),
        catchError(e => {
          return of(writeLog(e));
        })
      );
    })
  );
};

export const authEpics = combineEpics(loginEpic, refreshEpic);

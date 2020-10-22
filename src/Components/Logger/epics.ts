import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { FuncEpic } from "../../common/types";
import { WRITE_LOG, CREATE_LOG_START, CreateLogStartActions, createLogEnd, SEND_LOGS, SendLogsAction, sendLogsSuccess, createLog, WriteLogAction, sendLogs } from "./actions";

const createLogsEpic: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(CREATE_LOG_START),
    switchMap(({}: CreateLogStartActions) => {
      return from(deps.loggerDataProvider.createLogs()).pipe(
        switchMap(({ path, createdAt }: any) => {
          return of(createLogEnd(path, createdAt));
        }),
      );
    })
  );
};

const sendLogsEpic: FuncEpic = (action$: any, store$, deps) => {
    return action$.pipe(
      ofType(SEND_LOGS),
      switchMap(({}: SendLogsAction) => {
        return from(deps.loggerDataProvider.sendLogs(store$.value.auth.data.token)).pipe(
          switchMap(() => {
            return of(sendLogsSuccess(), createLog());
          }),
        );
      })
    );
};

const writeLogsEpic: FuncEpic = (action$: any, store$, deps) => {
    return action$.pipe(
      ofType(WRITE_LOG),
      switchMap(({err}: WriteLogAction) => {
        return from(deps.loggerDataProvider.writeLogs(store$.value.logger.path, err)).pipe(
          switchMap(() => {
            return of(createLog());
          }),
        );
      })
    );
};

export const loggerEpics = combineEpics(createLogsEpic, sendLogsEpic, writeLogsEpic);

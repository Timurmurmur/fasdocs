import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { FuncEpic } from "../../common/types";
import { GET_ALL_DOCUMENTS, GetAllDocumentsAction, getAllDocumentsSuccess, getAllDocumentsError } from "./actions";

const getAllDocumentsEpic: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(GET_ALL_DOCUMENTS),
    switchMap(({}: GetAllDocumentsAction) => {
      return from(deps.documentsDataProvider.getAllDocuments(store$.value.auth.data.token)).pipe(
        switchMap((documents) => {
          return of(getAllDocumentsSuccess(documents));
        }),
        catchError(e => {
          return of(getAllDocumentsError(e), writeLog(e));
        })
      );
    })
  );
};

export const homeEpics = combineEpics(getAllDocumentsEpic);

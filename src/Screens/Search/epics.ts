import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap, debounceTime, filter } from "rxjs/operators";
import { FuncEpic } from "../../common/types";
import { SEARCH_DOCUMENT_START, SearchDocumentStartAction, searchDocumentEnd, GET_DOCUMENT_BY_HELPER_START, GetDocumentByHelperStartAction, getDocumentByHelperEnd } from "./actions";
import { writeLog } from "../../Components/Logger/actions";

const searchHelpersEpic: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(SEARCH_DOCUMENT_START),
    // debounceTime(500),
    switchMap(({ str }: SearchDocumentStartAction) => {
      return from(deps.searchDataProvider.search(str, store$.value.auth.data.token)).pipe(
        switchMap((helpers) => {
          return of(searchDocumentEnd(helpers));
        }),
        catchError((err) => {
          return of(writeLog(err))
        })
      );
    })
  );
};

const getDocumentsByHelpersEpic: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(GET_DOCUMENT_BY_HELPER_START),
    switchMap(({ helper }: GetDocumentByHelperStartAction) => {
      return from(deps.searchDataProvider.getDocumentByHelper(helper, store$.value.auth.data.token)).pipe(
        switchMap((documents) => {
          return of(getDocumentByHelperEnd(documents));
        }),
        catchError((err) => {
          return of(writeLog(err))
        })
      );
    })
  );
};

export const searchEpics = combineEpics(searchHelpersEpic, getDocumentsByHelpersEpic);

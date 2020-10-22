import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap, debounceTime, filter } from "rxjs/operators";
import { FuncEpic } from "../../common/types";
import { LOAD_DOCUMENT_START, LoadDocumentStartAction, loadDocumentSuccess, loadDocumentError, CLEAR_CACHE_START, ClearCacheStartAction, clearCacheEnd } from "./actions";
import { writeLog } from "../../Components/Logger/actions";

const loadDocumentContent: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(LOAD_DOCUMENT_START),
    switchMap(({ document }: LoadDocumentStartAction) => {
      return from(deps.documentsDataProvider.loadDocumentContent(document, store$.value.auth.data.token, store$.value.docView.cachedDocumentsHashMap, store$.value.docView.totalCacheSize)).pipe(
        switchMap(({ document, hashMap, totalCacheSize }) => {
          return of(loadDocumentSuccess(document, hashMap, totalCacheSize));
        }),
        catchError((err) => {
          return of(loadDocumentError(err), writeLog(err));
        }) 
      );
    })
  );
};


const clearCacheEpic: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(CLEAR_CACHE_START),
    switchMap(({  }: ClearCacheStartAction) => {
      return from(deps.documentsDataProvider.clearCache(store$.value.docView.cachedDocumentsHashMap, store$.value.docView.totalCacheSize)).pipe(
        switchMap(({ hashMap, totalCacheSize }: any) => {
          return of(clearCacheEnd(totalCacheSize, hashMap));
        }),
      );
    })
  );
};



export const docViewEpics = combineEpics(loadDocumentContent, clearCacheEpic);

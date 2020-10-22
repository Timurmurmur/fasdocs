import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { FuncEpic } from "../../common/types";
import { DOWNLOAD_DOCUMENT_START, DownloadDocumentStartAction, saveFileToGalary, downloadDocumentLoading, SAVE_FILE_TO_GALARY_START, SaveFileToGalaryStartAction, saveFileToGalaryEnd, downloadDocumentEnd } from "./actions";
import { Alert } from "react-native";

const downloadFileEpic: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(DOWNLOAD_DOCUMENT_START),
    switchMap(({ document }: DownloadDocumentStartAction) => {
      return from(deps.documentsDataProvider.downloadFile(document, store$.value.auth.data.token)).pipe(
        switchMap(({ uri }) => {
          return of(saveFileToGalary(uri), downloadDocumentLoading('50%'));
        })
      );
    })
  );
};

const saveFileEpic: FuncEpic = (action$: any, store$, deps) => {
  return action$.pipe(
    ofType(SAVE_FILE_TO_GALARY_START),
    switchMap(({ uri }: SaveFileToGalaryStartAction) => {
      return from(deps.documentsDataProvider.saveToGalary(uri)).pipe(
        switchMap((result) => {
            Alert.alert("Файл успешно загружен");
            return of( downloadDocumentLoading('100%'),saveFileToGalaryEnd());
        })
      );
    })
  );
};

export const downloadEpics = combineEpics(downloadFileEpic, saveFileEpic);

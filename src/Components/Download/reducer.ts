import { Action } from "../../../App";
import { DownloadState } from "./types";
import { PageStatus } from "../../common/types";
import { AsyncStorage as storage } from "react-native";
import { persistReducer } from "redux-persist";
import { DOWNLOAD_DOCUMENT_START, DOWNLOAD_DOCUMENT_LOADING, DOWNLOAD_DOCUMENT_END, SAVE_FILE_TO_GALARY_END } from "./actions";


const defaultAuthState = { downloadStatus: PageStatus.LOADED, process: null, document: null };

export const download = (state: DownloadState = defaultAuthState, action: Action) => {
  switch (action.type) {
    case DOWNLOAD_DOCUMENT_START: {
        return {
            ...state,
            document: action.document,
            downloadStatus: PageStatus.LOADING,
            process: '0%'
        }
    }
    case DOWNLOAD_DOCUMENT_LOADING: {
        return {
            ...state,
            process: action.process
        }
    }
    case SAVE_FILE_TO_GALARY_END: {
        return {
            ...state,
            document: null,
            downloadStatus: PageStatus.LOADED,
            percent: 0,
        }
    }
    default:
      return state;
  }
};

import { Action } from "../../../App";
import { PageStatus } from "../../common/types";
import { DocViewState } from "./types";
import { persistReducer } from "redux-persist";
import { AsyncStorage as storage } from 'react-native';
import { LOAD_DOCUMENT_START, LAOD_DOCUMENT_SUCCESS, LAOD_DOCUMENT_ERROR, CLEAR_CACHE_START, CLEAR_CACHE_END } from "./actions";

const defaulDocViewState: DocViewState = { pageStatus: PageStatus.LOADING, document: null, error: null, cachedDocumentsHashMap: {}, totalCacheSize: 0 };

export const reducer = (state: DocViewState = defaulDocViewState, action: Action) => {
  switch (action.type) {
    case LOAD_DOCUMENT_START:
      return {
        ...state,
        pageStatus: PageStatus.LOADING,
      };
    case LAOD_DOCUMENT_SUCCESS:
      return {
        ...state,
        pageStatus: PageStatus.LOADED,
        document: action.document,
        cachedDocumentsHashMap: action.hashMap,
        totalCacheSize: action.totalCacheSize
      };
    case LAOD_DOCUMENT_ERROR: 
      return {
        ...state,
        error: action.err,
        pageStatus: PageStatus.LOADED
      }
    case CLEAR_CACHE_START:
      return {
        ...state
      }
    case CLEAR_CACHE_END: {
      return {
        ...state,
        cachedDocumentsHashMap: action.hashMap,
        totalCacheSize: action.totalCacheSize,
        pageStatus: PageStatus.LOADING
      }
    }
    default:
      return state;
  }
};

export const docView = persistReducer<DocViewState, Action>(
    {
      key: 'documents',
      storage,
      whitelist: [
        'cachedDocumentsHashMap',
      ]
    },
    reducer
  )
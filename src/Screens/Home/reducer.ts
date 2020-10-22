import { Action } from "../../../App";
import { HomeState } from "./types";
import { PageStatus } from "../../common/types";
import { GET_ALL_DOCUMENTS, GET_ALL_DOCUMENTS_ERROR, GET_ALL_DOCUMENTS_SUCCESS } from "./actions";
import { LOGOUT } from "../Auth/actions";


const defaultAuthState = { pageStatus: PageStatus.LOADING, documents: null, error: null };

export const home = (state: HomeState = defaultAuthState, action: Action) => {
  switch (action.type) {
    case GET_ALL_DOCUMENTS:
      return {
        ...state,
        pageStatus: PageStatus.LOADING,

      };
    case GET_ALL_DOCUMENTS_ERROR:
      return {
        ...state,
        pageStatus: PageStatus.ERROR,
        error: action.error
      };
    case GET_ALL_DOCUMENTS_SUCCESS:
      return {
        ...state,
        pageStatus: PageStatus.LOADED,
        documents: action.documents
      };
    case LOGOUT: {
      return {
        ...state,
        pageStatus: PageStatus.LOADING,
        documents: null
      }
    }
    default:
      return state;
  }
};
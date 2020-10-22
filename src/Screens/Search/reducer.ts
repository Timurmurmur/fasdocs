import { Action } from "../../../App";
import { PageStatus } from "../../common/types";
import { SearchState } from "./types";
import { SEARCH_DOCUMENT_START, SEARCH_DOCUMENT_END, GET_DOCUMENT_BY_HELPER_END, GET_DOCUMENT_BY_HELPER_START } from "./actions";
import { LOGOUT } from "../Auth/actions";


const defaultAuthState: SearchState = { pageStatus: PageStatus.LOADED, helpers: [], error: null, searchedDocuments: [] };

export const search = (state: SearchState = defaultAuthState, action: Action) => {
  switch (action.type) {
    case SEARCH_DOCUMENT_START:
      return {
        ...state,
        // pageStatus: PageStatus.LOADING,
      };
    case SEARCH_DOCUMENT_END:
      return {
        ...state,
        pageStatus: PageStatus.LOADED,
        helpers: action.helpers
      };
    case GET_DOCUMENT_BY_HELPER_START: 
        return {
            ...state,
            helpers: [],
        }
    case GET_DOCUMENT_BY_HELPER_END: 
        return {
            ...state,
            searchedDocuments: action.documents
        }
    case LOGOUT: {
      return {
        ...state,
        helpers: [],
        searchedDocuments: []
      }
    }
    default:
      return state;
  }
};
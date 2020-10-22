import { PageStatus } from "../../common/types";

export interface SearchState {
    pageStatus: PageStatus;
    helpers: Array<string> | [];
    error: any | null;
    searchedDocuments: any;
}
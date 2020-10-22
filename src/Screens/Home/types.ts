import { PageStatus } from "../../common/types";

export interface HomeState {
    pageStatus: PageStatus;
    documents: any;
    error: any;
}
import { PageStatus, DocumentWithLoadedAtachments } from "../../common/types";


export interface DocViewState {
    pageStatus: PageStatus;
    document: DocumentWithLoadedAtachments | null;
    error: any;
    cachedDocumentsHashMap: any;
    totalCacheSize: number;
}
import { PageStatus } from "../../common/types";

export interface DownloadState {
    downloadStatus: PageStatus;
    document: any;
    process: any;
}
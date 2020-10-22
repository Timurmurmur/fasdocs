import { Document } from "../../common/types";

export const DOWNLOAD_DOCUMENT_START = "@download/DOWNLOAD_DOCUMENT_START";
export type DOWNLOAD_DOCUMENT_START = typeof DOWNLOAD_DOCUMENT_START;

export interface DownloadDocumentStartAction {
    type: DOWNLOAD_DOCUMENT_START,
    document: any;
}

export const downloadDocumentStart = (document: any): DownloadDocumentStartAction => ({
    type: DOWNLOAD_DOCUMENT_START,
    document
});

export const DOWNLOAD_DOCUMENT_LOADING = "@download/DOWNLOAD_DOCUMENT_LOADING";
export type DOWNLOAD_DOCUMENT_LOADING = typeof DOWNLOAD_DOCUMENT_LOADING;

export interface DownloadDocumentLoadingAction {
    type: DOWNLOAD_DOCUMENT_LOADING,
    process: any;
}

export const downloadDocumentLoading = (process: any): DownloadDocumentLoadingAction => ({
    type: DOWNLOAD_DOCUMENT_LOADING,
    process
});

export const DOWNLOAD_DOCUMENT_END = "@download/DOWNLOAD_DOCUMENT_END";
export type DOWNLOAD_DOCUMENT_END = typeof DOWNLOAD_DOCUMENT_END;

export interface DownloadDocumentEndAction {
    type: DOWNLOAD_DOCUMENT_END,
    result: any;
}

export const downloadDocumentEnd = (result: any): DownloadDocumentEndAction => ({
    type: DOWNLOAD_DOCUMENT_END,
    result
})

export const SAVE_FILE_TO_GALARY_START = "@download/SAVE_FILE_TO_GALARY_START";
export type SAVE_FILE_TO_GALARY_START = typeof SAVE_FILE_TO_GALARY_START;

export interface SaveFileToGalaryStartAction {
    type: SAVE_FILE_TO_GALARY_START,
    uri: string;
}

export const saveFileToGalary = (uri: string): SaveFileToGalaryStartAction => ({
    type: SAVE_FILE_TO_GALARY_START,
    uri
})


export const SAVE_FILE_TO_GALARY_END = "@download/SAVE_FILE_TO_GALARY_END";
export type SAVE_FILE_TO_GALARY_END = typeof SAVE_FILE_TO_GALARY_END;

export interface SaveFileToGalaryEndAction {
    type: SAVE_FILE_TO_GALARY_END,
}

export const saveFileToGalaryEnd = (): SaveFileToGalaryEndAction => ({
    type: SAVE_FILE_TO_GALARY_END,
})

export type DownloadActions = DownloadDocumentEndAction | DownloadDocumentLoadingAction | DownloadDocumentStartAction | SaveFileToGalaryStartAction | SaveFileToGalaryEndAction;
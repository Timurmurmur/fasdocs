import { DocumentWithLoadedAtachments, Document } from "../../common/types";

export const LOAD_DOCUMENT_START = "@document/LOAD_DOCUMENT_START";
export type LOAD_DOCUMENT_START = typeof LOAD_DOCUMENT_START;

export interface LoadDocumentStartAction {
    type: LOAD_DOCUMENT_START,
    document: Document;
}

export const loadDocumentStart = (document: Document): LoadDocumentStartAction => ({
    type: LOAD_DOCUMENT_START,
    document
})


export const LAOD_DOCUMENT_SUCCESS = "@document/LOAD_DOCUMENT_SUCCESS";
export type LOAD_DOCUMENT_SUCCESS = typeof LAOD_DOCUMENT_SUCCESS;

export interface LoadDocumentSuccessAction {
    type: LOAD_DOCUMENT_SUCCESS;
    document: DocumentWithLoadedAtachments;
    hashMap: any;
    totalCacheSize: number;
}

export const loadDocumentSuccess = (document: DocumentWithLoadedAtachments, hashMap: any, totalCacheSize: number): LoadDocumentSuccessAction => ({
    type: LAOD_DOCUMENT_SUCCESS,
    document,
    hashMap,
    totalCacheSize
});


export const LAOD_DOCUMENT_ERROR = "@document/LAOD_DOCUMENT_ERROR";
export type LAOD_DOCUMENT_ERROR = typeof LAOD_DOCUMENT_ERROR;

export interface LoadDocumentErrorAction {
    type: LAOD_DOCUMENT_ERROR;
    err: any;
}

export const loadDocumentError = (err: any): LoadDocumentErrorAction => ({
    type: LAOD_DOCUMENT_ERROR,
    err
});

export const CLEAR_CACHE_START = "@document/CLEAR_CACHE_START";
export type CLEAR_CACHE_START = typeof CLEAR_CACHE_START;

export interface ClearCacheStartAction {
    type: CLEAR_CACHE_START;
}

export const clearCacheStart = (): ClearCacheStartAction => ({
    type: CLEAR_CACHE_START
});


export const CLEAR_CACHE_END = "@document/CLEAR_CACHE_END";
export type CLEAR_CACHE_END = typeof CLEAR_CACHE_END;

export interface ClearCacheEndAction {
    type: CLEAR_CACHE_END;
    totalCacheSize: number;
    hashMap: any;
}

export const clearCacheEnd = (totalCacheSize: number, hashMap: any): ClearCacheEndAction => ({
    type: CLEAR_CACHE_END,
    totalCacheSize,
    hashMap
});


export type DocViewActions = LoadDocumentErrorAction | LoadDocumentStartAction | LoadDocumentSuccessAction | ClearCacheEndAction | ClearCacheStartAction;
export const SEARCH_DOCUMENT_START = "@search/SEARCH_DOCUMENT_START";
export type SEARCH_DOCUMENT_START = typeof SEARCH_DOCUMENT_START;

export interface SearchDocumentStartAction {
    type: SEARCH_DOCUMENT_START
    str: string;
}

export const searchDocumentStart = (str: string): SearchDocumentStartAction => ({
    type: SEARCH_DOCUMENT_START,
    str
})

export const SEARCH_DOCUMENT_END = "@search/SEARCH_DOCUMENT_END";
export type SEARCH_DOCUMENT_END = typeof SEARCH_DOCUMENT_END;

export interface SearchDocumentEndAction {
    type: SEARCH_DOCUMENT_END;
    helpers: Array<string>;
}

export const searchDocumentEnd = (helpers: Array<string>): SearchDocumentEndAction => ({
    type: SEARCH_DOCUMENT_END,
    helpers
});


export const GET_DOCUMENT_BY_HELPER_START = "@search/GET_DOCUMENT_BY_HELPER_START";
export type GET_DOCUMENT_BY_HELPER_START = typeof GET_DOCUMENT_BY_HELPER_START;


export interface GetDocumentByHelperStartAction {
    type: GET_DOCUMENT_BY_HELPER_START,
    helper: string;
}

export const getDocumentByHelperStart = (helper: string): GetDocumentByHelperStartAction => ({
    type: GET_DOCUMENT_BY_HELPER_START,
    helper
});

export const GET_DOCUMENT_BY_HELPER_END = "@search/GET_DOCUMENT_BY_HELPER_END";
export type GET_DOCUMENT_BY_HELPER_END = typeof GET_DOCUMENT_BY_HELPER_END;


export interface GetDocumentByHelperEndAction {
    type: GET_DOCUMENT_BY_HELPER_END,
    documents: any;
}

export const getDocumentByHelperEnd = (documents: any): GetDocumentByHelperEndAction => ({
    type: GET_DOCUMENT_BY_HELPER_END,
    documents
});

export type SearchActions = SearchDocumentStartAction | SearchDocumentEndAction | GetDocumentByHelperStartAction | GetDocumentByHelperEndAction;
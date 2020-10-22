export const GET_ALL_DOCUMENTS = "@home/GET_ALL_DOCUMENTS";
export type GET_ALL_DOCUMENTS = typeof GET_ALL_DOCUMENTS;


export interface GetAllDocumentsAction {
    type: GET_ALL_DOCUMENTS
}

export const getAllDocuments = (): GetAllDocumentsAction => ({
    type: GET_ALL_DOCUMENTS
});

export const GET_ALL_DOCUMENTS_SUCCESS = "@home/GET_ALL_DOCUMENTS_SUCCESS";
export type GET_ALL_DOCUMENTS_SUCCESS = typeof GET_ALL_DOCUMENTS_SUCCESS;


export interface GetAllDocumentsSuccessAction {
    type: GET_ALL_DOCUMENTS_SUCCESS;
    documents: any;
}

export const getAllDocumentsSuccess = (documents: any): GetAllDocumentsSuccessAction => ({
    type: GET_ALL_DOCUMENTS_SUCCESS,
    documents
});


export const GET_ALL_DOCUMENTS_ERROR = "@home/GET_ALL_DOCUMENTS_ERROR";
export type GET_ALL_DOCUMENTS_ERROR = typeof GET_ALL_DOCUMENTS_ERROR;


export interface GetAllDocumentsErrorAction {
    type: GET_ALL_DOCUMENTS_ERROR;
    error: any;
}

export const getAllDocumentsError = (error: any): GetAllDocumentsErrorAction => ({
    type: GET_ALL_DOCUMENTS_ERROR,
    error
});


export type HomeActions = GetAllDocumentsAction | GetAllDocumentsSuccessAction | GetAllDocumentsErrorAction;
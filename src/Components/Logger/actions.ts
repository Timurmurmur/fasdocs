export const CREATE_LOG_START = "@logger/CREATE_LOG_START";
export type CREATE_LOG_START = typeof CREATE_LOG_START;


export interface CreateLogStartActions {
    type: CREATE_LOG_START;
}

export const createLog = (): CreateLogStartActions => ({
    type: CREATE_LOG_START
})

export const CREATE_LOG_END = "@logger/CREATE_LOG_END";
export type CREATE_LOG_END = typeof CREATE_LOG_END;

export interface CreateLogEndAction {
    type: CREATE_LOG_END;
    path: string;
    createdAt: string;
}

export const createLogEnd = (path: string, createdAt: string): CreateLogEndAction => ({
    type: CREATE_LOG_END,
    path,
    createdAt
}) 

export const DELETE_LOGS = "@logger/DELETE_LOGS";
export type DELETE_LOGS = typeof DELETE_LOGS;

export interface DeleteLogsAction {
    type: DELETE_LOGS
}

export const deleteLogs = (): DeleteLogsAction => ({
    type: DELETE_LOGS
})

export const WRITE_LOG = "@logger/WRITE_LOG";
export type WRITE_LOG = typeof WRITE_LOG;

export interface WriteLogAction {
    type: WRITE_LOG;
    err: any;
}

export const writeLog = (err: any): WriteLogAction => ({
    type: WRITE_LOG,
    err
})

export const SEND_LOGS = "@logger/SEND_LOGS";
export type SEND_LOGS = typeof SEND_LOGS;


export interface SendLogsAction {
    type: SEND_LOGS,
}

export const sendLogs = (): SendLogsAction => ({
    type: SEND_LOGS
})

export const SEND_LOGS_SUCCESS = "@logger/SEND_LOGS_SUCCESS";
export type SEND_LOGS_SUCCESS = typeof SEND_LOGS_SUCCESS;

export interface SendLogsSuccessAction {
    type: SEND_LOGS_SUCCESS
}

export const sendLogsSuccess = (): SendLogsSuccessAction => ({
    type: SEND_LOGS_SUCCESS
});

export const SEND_LOGS_ERROR = "@logger/SEND_LOGS_ERROR";
export type SEND_LOGS_ERROR = typeof SEND_LOGS_ERROR;

export interface SendLogsErrorAction {
    type: SEND_LOGS_ERROR
}

export const sendLogsError = (): SendLogsErrorAction => ({
    type: SEND_LOGS_ERROR 
})

export type LoggerActions = CreateLogStartActions | WriteLogAction | SendLogsAction | SendLogsSuccessAction | SendLogsErrorAction | DeleteLogsAction | CreateLogEndAction;
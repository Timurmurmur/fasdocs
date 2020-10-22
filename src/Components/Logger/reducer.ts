import { Action } from "../../../App";
import { PageStatus } from "../../common/types";
import { CREATE_LOG_END } from "./actions";
import { persistReducer } from "redux-persist";
import { LoggerState } from "./types";
import { AsyncStorage as storage } from 'react-native';


const defaultLoggerState = { path: null, createdAt: null };

export const reducer = (state: LoggerState = defaultLoggerState, action: Action) => {
  switch (action.type) {
    case CREATE_LOG_END: {
        return {
            ...state,
            path: action.path,
            createdAt: action.createdAt
        }
    }
    default:
      return state;
  }
};

export const logger = persistReducer<LoggerState, Action>(
    {
      key: 'logger',
      storage,
      whitelist: [
        'path',
        'createdAt'
      ]
    },
    reducer
)
import {
  AsyncStorage
} from "react-native"
import {
  AxiosError
} from "axios";
import moment from 'moment';
import {
  MiddlewareAPI,
  Dispatch,
  Middleware
} from "redux";
import {
  State,
  Action
} from "../../../App";

// export const logger = async (err: AxiosError) => {
//   let logs = await AsyncStorage.getItem('LOGGER');

//   if (logs === null) {
//     logs = '';
//     logs += `${moment(new Date()).format('DD-MM-YYYY hh:mm:ss')} | ERROR | CONFIG: ${err.config} | RESPONSE: ${err.message}\n`
//   } else {
//     logs += `${new Date()} | ERROR | CONFIG: ${err.config} | RESPONSE: ${err.message}\n`
//   }

//   await AsyncStorage.setItem("LOGGER", logs);
// }

export const loggerMiddleware: Middleware<State, State, Dispatch<Action>> = (
  store: MiddlewareAPI<Dispatch<Action>>
): ((next: Dispatch<Action>) => (action: Action) => Action) => (
  next: Dispatch<Action>
): ((action: Action) => Action) => (action: Action): Action => {

  switch(action.type) {
    case '@home/GET_ALL_DOCUMENTS': {
      const logState = store.getState().logger;
      if (logState.path === null || logState.createdAt === null){
        store.dispatch({
          type: '@logger/CREATE_LOG_START'
        })
      } else if (store.getState()?.logger?.createdAt < new Date().getTime()) {
        console.log("LOG_SEND");
        store.dispatch({
          type: '@logger/SEND_LOGS'
        })
      }
    }
  }
  return next(action);
};
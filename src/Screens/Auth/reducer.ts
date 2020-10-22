import { Action } from "../../../App";
import { AuthState } from "./types";
import { PageStatus } from "../../common/types";
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_RESOTORE_INITIAL, SET_AUTH_BY_BIOMETRIC, SET_IS_FIRST_OPEN, LOGOUT, REFRESH_TOKEN_END } from "./actions";
import { AsyncStorage as storage } from "react-native";
import { persistReducer } from "redux-persist";


const defaultAuthState = { pageStatus: PageStatus.LOADED, data: null, authByBiometric: null, isBlocked: null, blockMessage: null, error: null, cachedAuthData: null, isFirstOpen: true, hardwareStatus: null };

const reducer = (state: AuthState = defaultAuthState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        pageStatus: PageStatus.LOADING,
        cachedAuthData: {
          username: action.username,
          password: action.password
        }
      };
      
    case LOGIN_ERROR:
      return {
        ...state,
        pageStatus: PageStatus.ERROR,
        error: action.error
      };
      
    case LOGIN_SUCCESS:
      return {
        ...state,
        pageStatus: PageStatus.LOADED,
        data: action.response.user,
        isBlocked: action.response.isBlocked,
        blockMessage: action.response.blockMessage,
        // cachedAuthData: {
        //   username: state.cachedAuthData?.username,
        //   password: state.cachedAuthData?.password,
        //   name: action.response.user.name
        // }
      };

    case LOGIN_RESOTORE_INITIAL: {
      return {
        ...state,
        data: null,
        isBlocked: null,
        blockMessage: null,
        error: null,
      }
    }

    case SET_AUTH_BY_BIOMETRIC: {
      return {
        ...state,
        authByBiometric: action.data,
        hardwareStatus: action.hadrdwareStatus
      }
    }
    
    case LOGOUT: {
      return {
        ...state,
        data: null,
        isBlocked: null,
        blockMessage: null,
        error: null,
      }
    }

    case SET_IS_FIRST_OPEN: {
      return {
        ...state,
        isFirstOpen: action.data
      }
    }

    case REFRESH_TOKEN_END: {
      return {
        ...state,
        data: action.user
      }
    }
    default:
      return state;
  }
};

export const auth = persistReducer<AuthState, Action>(
  {
    key: 'profile',
    storage,
    whitelist: [
      'authByBiometric',
      'cachedAuthData',
      'isFirstOpen',
      'hardwareStatus'
    ]
  },
  reducer
)

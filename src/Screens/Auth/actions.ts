export const LOGIN = "@auth/LOGIN";
export type LOGIN = typeof LOGIN;

export interface LoginAction {
    type: LOGIN,
    username: string;
    password: string;
}
// {
//     "password": "Fgh310Hjk",
//     "username": "test01",
//     "info": {
//       "appName": "fasapp",
//       "packageName": "com.bnet24.fas",
//       "version": "1.1.0",
//       "build": "1.0.0",
//       "deviceModel": "Iphone",
//       "iosVersion": "10",
//       "deviceName": "Iphone",
//       "identifierForVendor": "1"
//     }
//   }
export const login = (username: string, password: string): LoginAction => ({
    type: LOGIN,
    username,
    password
});

export const LOGIN_SUCCESS = "@auth/LOGIN_SUCCESS";
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export interface LoginSuccessAction {
    type: LOGIN_SUCCESS,
    response: any
}

export const loginSuccess = (response: any): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    response
});


export const LOGIN_ERROR = "@auth/LOGIN_ERROR";
export type LOGIN_ERROR = typeof LOGIN_ERROR;

export interface LoginErrorAction {
    type: LOGIN_ERROR,
    error: any
}

export const loginError = (err: any): LoginErrorAction => ({
    type: LOGIN_ERROR,
    error: err
});

export const LOGIN_RESOTORE_INITIAL = "@auth/LOGIN_RESTORE_INITIAL";
export type LOGIN_RESOTORE_INITIAL = typeof LOGIN_RESOTORE_INITIAL;

export interface LoginRestoreInitalAction {
  type: LOGIN_RESOTORE_INITIAL;
}


export const loginRestore = (): LoginRestoreInitalAction => ({
  type: LOGIN_RESOTORE_INITIAL
})

// export const CACHE_AUTH_DATA = "@auth/CACHE_AUTH_DATA";
// export type CACHE_AUTH_DATA = typeof CACHE_AUTH_DATA;

// export interface CacheAuthDataAction {
//     type: CACHE_AUTH_DATA,
//     data: any;
// }

// export const cacheAuthData = (data: any): CacheAuthDataAction => ({
//     type: CACHE_AUTH_DATA,
//     data
// });

export const SET_AUTH_BY_BIOMETRIC = "@auth/SET_AUTH_BY_BIOMETRIC";
export type SET_AUTH_BY_BIOMETRIC = typeof SET_AUTH_BY_BIOMETRIC;

export interface SetAuthByBiometricAction {
    type: SET_AUTH_BY_BIOMETRIC;
    data: boolean;
    hadrdwareStatus: number;
}

export const setAuthByBiometric = (data: boolean, hadrdwareStatus: number): SetAuthByBiometricAction => ({
    type: SET_AUTH_BY_BIOMETRIC,
    data,
    hadrdwareStatus
})

export const SET_IS_FIRST_OPEN = "@auth/SET_IS_FIRST_OPEN";
export type SET_IS_FIRST_OPEN = typeof SET_IS_FIRST_OPEN;

export interface SetIsFirstOpenAction {
    type: SET_IS_FIRST_OPEN;
    data: boolean;
}

export const setIsFirstOpen = (data: boolean): SetIsFirstOpenAction => ({
    type: SET_IS_FIRST_OPEN,
    data
})


export const LOGOUT = "@auth/LOGOUT";
export type LOGOUT = typeof LOGOUT;

export interface LogoutAction {
    type: LOGOUT
}

export const logout = (): LogoutAction => ({
    type: LOGOUT
})

export const REFRESH_TOKEN_START = "@auth/REFRESH_TOKEN_START";
export type REFRESH_TOKEN_START = typeof REFRESH_TOKEN_START;

export interface RefreshTokenStartAction {
    type: REFRESH_TOKEN_START;
    refreshToken: string;
}

export const refreshTokenStart = (refreshToken: string): RefreshTokenStartAction => ({
    type: REFRESH_TOKEN_START,
    refreshToken
})

export const REFRESH_TOKEN_END = "@auth/REFRESH_TOKEN_END";
export type REFRESH_TOKEN_END = typeof REFRESH_TOKEN_END;

export interface RefreshTokenEndAction {
    type: REFRESH_TOKEN_END,
    user: {
        name: string,
        token: string,
        refreshToken: string,
    }
}

export const refreshTokenEnd = (user: {
    name: string,
    token: string,
    refreshToken: string,
}): RefreshTokenEndAction => ({
    type: REFRESH_TOKEN_END,
    user
})

export type AuthActions = LoginAction | LoginErrorAction | LoginSuccessAction | LoginRestoreInitalAction | SetAuthByBiometricAction | SetIsFirstOpenAction | LogoutAction | RefreshTokenEndAction | RefreshTokenStartAction;


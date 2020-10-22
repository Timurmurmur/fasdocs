import { PageStatus } from "../../common/types";

export interface AuthSuccessResponse {
    user: {
        name: string;
        token: string;
        refreshToken: string;
    },
    isBlocked: boolean;
    blockMessage: string | null;
};

export interface AuthState {
    pageStatus: PageStatus;
    data: any;
    authByBiometric: boolean | null;
    isBlocked: boolean | null;
    blockMessage: string | null;
    error: null | string;
    cachedAuthData: {
        username: string;
        password: string;
    } | null;
    isFirstOpen: boolean;
    hardwareStatus: number | null;
}
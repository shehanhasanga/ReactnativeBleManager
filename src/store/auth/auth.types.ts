import {UserData} from "./auth.actions";

export const USER_ROLE_ADMIN = 'Admin';
export const USER_ROLE_ESS = 'ESS';

export interface AuthState {
  myInfoSuccess: boolean;
  isCalledMyInfo: boolean;
  isFinishedMyInfo: boolean;
  checkingInstance: boolean;
  instanceExists?: boolean;
  myInfoFailed?: boolean;
  myInfoError?: ErrorResponse;
  isFinishedSaveUserData : boolean;
}

export const FETCH_TOKEN = 'AUTH_FETCH_TOKEN';
export const LOGOUT = 'AUTH_LOGOUT';
export const FETCH_MY_INFO = 'AUTH_FETCH_MY_INFO';
export const FETCH_MY_INFO_FINISHED = 'AUTH_FETCH_MY_INFO_FINISHED';
export const MY_INFO_FAILED = 'AUTH_MY_INFO_FAILED';
export const FETCH_NEW_TOKEN_FINISHED = 'AUTH_FETCH_NEW_TOKEN_FINISHED';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const SAVE_USER_DATA_FINISHED = 'SAVE_USER_DATA_FINISHED';

export interface FetchTokenAction {
  type: typeof FETCH_TOKEN;
  username: string;
  password: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type WithLogoutAction<T> = LogoutAction | T;

export interface FetchMyInfoAction {
  type: typeof FETCH_MY_INFO;
}

export interface FetchMyInfoFinishedAction {
  type: typeof FETCH_MY_INFO_FINISHED;
  payload?: string;
  error: boolean;
}




export interface MyInfoFailedAction {
  type: typeof MY_INFO_FAILED;
  state: string;
  error?: ErrorResponse;
}

export interface FetchNewTokenFinishedAction {
  type: typeof FETCH_NEW_TOKEN_FINISHED;
}

export interface SaveUserDataAction {
  type: typeof SAVE_USER_DATA;
  userData: UserData;
}

export interface SaveUserDataFinishedAction {
  type: typeof SAVE_USER_DATA_FINISHED;
  userData: UserData;
}

export type AuthActionTypes =
  | FetchTokenAction
  | LogoutAction
  | FetchMyInfoAction
  | FetchMyInfoFinishedAction
  | MyInfoFailedAction
  | FetchNewTokenFinishedAction
  | SaveUserDataFinishedAction
  | SaveUserDataAction;


export interface AuthSuccessResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string | null;
  refresh_token: string;
}

export interface AuthErrorResponse {
  error: string;
  error_description: string;
}

export interface ErrorResponse {
  error?: string;
  code: number;
}

export type NullableString = string | null;


export interface User {
  userName: string;
  userRole: typeof USER_ROLE_ADMIN | typeof USER_ROLE_ESS;

}


export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;




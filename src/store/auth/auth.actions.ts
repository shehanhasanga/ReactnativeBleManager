import {
  FETCH_MY_INFO, FETCH_NEW_TOKEN_FINISHED,
  FETCH_TOKEN,
  FetchMyInfoAction, FetchNewTokenFinishedAction,
  FetchTokenAction,
  LOGOUT,
  LogoutAction,
} from "./auth.types";


export const fetchAuthToken = (
  username: string,
  password: string,
): FetchTokenAction => {
  return {
    type: FETCH_TOKEN,
    username,
    password,
  };
};

export const fetchNewAuthTokenFinished = (): FetchNewTokenFinishedAction => ({
  type: FETCH_NEW_TOKEN_FINISHED,
});


export const logout = (): LogoutAction => {
  return {
    type: LOGOUT,
  };
};

export const fetchMyInfo = (): FetchMyInfoAction => {
  return {
    type: FETCH_MY_INFO,
  };
};




import {
  FETCH_MY_INFO, FETCH_NEW_TOKEN_FINISHED,
  FETCH_TOKEN,
  FetchMyInfoAction, FetchNewTokenFinishedAction,
  FetchTokenAction,
  LOGOUT,
  LogoutAction, SAVE_USER_DATA, SAVE_USER_DATA_FINISHED, SaveUserDataAction,
} from "./auth.types";


export interface UserData {
  userId : string;
  dateOfBirth : string;
  height : string;
  weight : string;
  gender :string;
}

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

export const saveUserDataAction = (
    userData:UserData
): SaveUserDataAction => {
  return {
    type: SAVE_USER_DATA,
    userData : userData
  };
};

export const saveUserDataFinished = (
    success: boolean
): SaveUserDataAction => {
  return {
    type: SAVE_USER_DATA_FINISHED,
    success : success
  };
};

export const fetchMyInfo = (): FetchMyInfoAction => {
  return {
    type: FETCH_MY_INFO,
  };
};




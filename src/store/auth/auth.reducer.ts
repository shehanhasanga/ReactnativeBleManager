import {
  AuthActionTypes,
  AuthState,
  FETCH_MY_INFO,
  FETCH_MY_INFO_FINISHED,
  LOGOUT, MY_INFO_FAILED, SAVE_USER_DATA, SAVE_USER_DATA_FINISHED,
  WithLogoutAction
} from "./auth.types";


const initialState: AuthState = {
  myInfoSuccess: false,
  isCalledMyInfo: false,
  isFinishedMyInfo: false,
  checkingInstance: false,
  isFinishedSaveUserData : false,
};

const authReducer = (
  state = initialState,
  action: WithLogoutAction<AuthActionTypes>,
): AuthState => {
  switch (action.type) {
    case FETCH_MY_INFO_FINISHED:
      return {
        ...state,
        myInfoSuccess: !action.error,
        myInfoFailed: action.error,
        isFinishedMyInfo: true,
      };
    case FETCH_MY_INFO:
      return {
        ...state,
        myInfoSuccess: false,
        isCalledMyInfo: true,
        isFinishedMyInfo: false,
      };
    case MY_INFO_FAILED:
      return {
        ...state,
        myInfoError: action.error,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case SAVE_USER_DATA_FINISHED:
      return {
        ...state,
        isFinishedSaveUserData : action.success
      }
    case SAVE_USER_DATA:
      return {
        ...state,
        isFinishedSaveUserData : false
      }
    default:
      return state;
  }
};

export default authReducer;

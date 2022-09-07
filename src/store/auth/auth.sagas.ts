
import {call, takeEvery, put, all, select} from 'redux-saga/effects';
import {
  FETCH_TOKEN,
  LOGOUT,
  FETCH_MY_INFO, FetchTokenAction, SAVE_USER_DATA, SaveUserDataAction,
} from './auth.types';
import {authenticate, saveUserDataRequest} from "../../services/api/authentication";
import {AuthenticationError, getMessageAlongWithGenericErrors} from "../../services/api/errors";
import {fetchNewAuthTokenFinished, saveUserDataFinished} from "./auth.actions";
import {TYPE_ERROR} from "../global/types";
import {closeLoader, openLoader, showSnackMessage} from "../global/actions";
import {setMulti} from "../storage/storage.actions";
import {ACCESS_TOKEN, REFRESH_TOKEN, USERID, USERNAME} from "../../services/storage/storage";



function* saveUserData(action: SaveUserDataAction) {
  try {
    yield put(openLoader());
    const response: Response = yield call(
        saveUserDataRequest,
        action.userData
    );
    const data = yield call([response, response.json]);
    yield put(saveUserDataFinished(true));

  }  catch (error) {
    yield showSnackMessage(
        getMessageAlongWithGenericErrors(error, 'Authentication Failed.'),
        TYPE_ERROR,
    );
    yield put(saveUserDataFinished(false));
  } finally {
    yield put(closeLoader());
  }
}

function* fetchAuthToken(action: FetchTokenAction) {
  try {
    yield openLoader();
    // const authParams: AuthParams = yield selectAuthParams();

    const response: Response = yield call(
        authenticate,
        action.username,
        action.password,
    );


    const data = yield call([response, response.json]);
    if (data.error) {
      if (data.error === 'authentication_failed') {
        throw new AuthenticationError(data.error_description);
      } else {
        throw new AuthenticationError('Invalid Credentials.');
      }
    } else {
      console.log(data.payload.token)
      yield put(setMulti({
        [USERNAME]: action.username,
        [USERID]: data.payload.user.id,
        [ACCESS_TOKEN]: data.payload.token,
        [REFRESH_TOKEN]: data.payload.refreshToken,
      }))

      yield put(fetchNewAuthTokenFinished());
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Authentication Failed.'),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}




export function* watchAuthActions() {
  yield takeEvery(FETCH_TOKEN, fetchAuthToken);
  yield takeEvery(SAVE_USER_DATA, saveUserData);
  // yield takeEvery(LOGOUT, logout);
  // yield takeEvery(FETCH_MY_INFO, fetchMyInfo);
}

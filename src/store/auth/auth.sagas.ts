
import {call, takeEvery, put, all, select} from 'redux-saga/effects';
import {
  FETCH_TOKEN,
  LOGOUT,
  FETCH_MY_INFO, FetchTokenAction,
} from './auth.types';
import {authenticate} from "../../services/api/authentication";
import {AuthenticationError, getMessageAlongWithGenericErrors} from "../../services/api/errors";
import {fetchNewAuthTokenFinished} from "./auth.actions";
import {TYPE_ERROR} from "../global/types";
import {closeLoader, openLoader, showSnackMessage} from "../global/actions";
import {setMulti} from "../storage/storage.actions";
import {ACCESS_TOKEN, REFRESH_TOKEN, USERNAME} from "../../services/storage/storage";





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
        [ACCESS_TOKEN]: data.access_token,
        [REFRESH_TOKEN]: data.refresh_token,
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
  // yield takeEvery(LOGOUT, logout);
  // yield takeEvery(FETCH_MY_INFO, fetchMyInfo);
}

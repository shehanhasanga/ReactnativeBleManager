

import {call, all, takeEvery, select,put} from 'redux-saga/effects';
import storage, {
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN, USERID, DEVICEID,
} from '../../services/storage/storage';
import {
  SET_ITEM,
  SET_MULTI, SetItemAction, SetMultiAction, StorageState,
} from './storage.types';
import {setMulti} from "./storage.actions";
export function* loadAsyncStorage() {
  try {
    const keys = [
      USERNAME,
        USERID,
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      DEVICEID,
    ];
    const keyValuePairs = yield call(storage.multiGet, keys);
    // update redux store
    yield put(setMulti(keyValuePairs))
  } catch (error) {

  }
}

function* setItemAsyncStorage(action: SetItemAction) {
  try {
    console.log("setItemAsyncStorage")
    console.log(action.key)
    console.log(action.value)
    yield all(storage.set(action.key, action.value)) ;
  } catch (error) {
    console.log(error)
  }
}

function* setMultiAsyncStorage(action: SetMultiAction) {
  try {
    const keys = Object.keys(action.keyValuePairs);
    yield all(
        keys.map((keyName) => {
          const key = <keyof Partial<StorageState>>keyName;
          storage.set(key, action.keyValuePairs[key]);
        }),
    );
  } catch (error) {}
}

export function* watchSetStorageItem() {
  yield takeEvery(SET_ITEM, setItemAsyncStorage);
  yield takeEvery(SET_MULTI, setMultiAsyncStorage);
}

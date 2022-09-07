import logger from 'redux-logger';

import {configureStore} from '@reduxjs/toolkit';
import bluetoothReducer from './bluetooth/bluetooth.reducer';
import {useDispatch} from 'react-redux';
import {combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {all, fork,call} from 'redux-saga/effects';
import {bluetoothSaga} from './bluetooth/bluetooth.saga';
import testReducer from "./bluetooth/test.reducer";
import BLEReducer from "./bluetooth/reducer";
import GlobalReducer from "./global/reducer";
import {watchAuthActions} from "./auth/auth.sagas";
import authReducer from "./auth/auth.reducer";
import {loadAsyncStorage, watchSetStorageItem} from "./storage/storage.sagas";
import storageReducer from "./storage/storage.reducer";
import {watchSessionActions} from "./session/session.saga";
import sessionReducer from "./session/session.reducer";

const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* rootSaga() {
  yield all([fork(bluetoothSaga), fork(watchAuthActions),   call(loadAsyncStorage),     call(watchSetStorageItem), call(watchSessionActions), ]);
};

const rootReducer = combineReducers({
  bluetooth: BLEReducer,
  commandAcknew : testReducer,
  global : GlobalReducer,
  auth : authReducer,
  storage: storageReducer,
  session: sessionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    // return getDefaultMiddleware().concat(logger).concat(sagaMiddleware);
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
  devTools: process.env.NODE_ENV === 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

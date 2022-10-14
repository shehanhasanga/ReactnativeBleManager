

import {RootState} from 'store';
import {createSelector} from 'reselect';
import {
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../../services/storage/storage';
import {
  StorageState,
} from './storage.types';
import {AuthParams} from "../../services/api/apiService";

export const selectStorage = (state: RootState): StorageState => state.storage;

export const selectUsername = createSelector<
  RootState,
  StorageState,
>(selectStorage, (storage) => storage[USERNAME]);



export const selectAccessToken = createSelector<
  RootState,
  StorageState,
>([selectStorage], (storage) => storage[ACCESS_TOKEN]);

export const selectAuthParams = createSelector<
    RootState,
    StorageState,
    AuthParams
    >([selectStorage], (storage) => ({
  [ACCESS_TOKEN]: storage[ACCESS_TOKEN],
  [REFRESH_TOKEN]: storage[REFRESH_TOKEN]
}));






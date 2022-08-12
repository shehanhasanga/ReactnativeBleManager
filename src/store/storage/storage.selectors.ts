

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

export const selectStorage = (state: RootState): StorageState => state.storage;

export const selectUsername = createSelector<
  RootState,
  StorageState,
>(selectStorage, (storage) => storage[USERNAME]);



export const selectAccessToken = createSelector<
  RootState,
  StorageState,
>([selectStorage], (storage) => storage[ACCESS_TOKEN]);








import {
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../../services/storage/storage';

export interface StorageState {
  [USERNAME]: NullableString;
  [ACCESS_TOKEN]: NullableString;
  [REFRESH_TOKEN]: NullableString;
  loaded?: boolean;
  error?: any;
  fetchingAccessTokenLock: boolean;
}

export type NullableString = string | null;

export const SET_ITEM = 'STORAGE_SET_ITEM';
export const SET_MULTI = 'STORAGE_SET_MULTI';

export interface SetItemAction {
  type: typeof SET_ITEM;
  key: string;
  value: NullableString;
}

export interface SetMultiAction {
  type: typeof SET_MULTI;
  keyValuePairs: Partial<StorageState>;
}

export type StorageActionTypes =
  | SetItemAction
  | SetMultiAction

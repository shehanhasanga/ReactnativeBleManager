

import {
  NullableString,
  SET_ITEM,
  SET_MULTI, SetItemAction, SetMultiAction, StorageState,
} from './storage.types';

export const setItem = (key: string, value: NullableString): SetItemAction => {
  return {
    type: SET_ITEM,
    key,
    value,
  };
};

export const setMulti = (
  keyValuePairs: Partial<StorageState>,
): SetMultiAction => {
  return {
    type: SET_MULTI,
    keyValuePairs,
  };
};


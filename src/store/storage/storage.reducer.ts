
import {
  SET_ITEM,
  SET_MULTI, StorageActionTypes, StorageState,
} from './storage.types';
import {
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../../services/storage/storage';

const initialState: StorageState = {
  [USERNAME]: null,
  [ACCESS_TOKEN]: null,
  [REFRESH_TOKEN]: null,
  loaded: false,
  fetchingAccessTokenLock: false,
};

const storageReducer = (
  state = initialState,
  action: StorageActionTypes,
): StorageState => {
  switch (action.type) {
    case SET_ITEM:
      return {
        ...state,
        [action.key]: action.value,
      };
    case SET_MULTI:
      const keyValues = {...action.keyValuePairs};
      return {
        ...state,
        ...keyValues,
      };
    default:
      return state;
  }
};

export default storageReducer;

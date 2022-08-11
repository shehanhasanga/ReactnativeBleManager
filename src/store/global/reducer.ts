import {GlobalActionTypes, GlobalState, LOADING} from "./types";


const initialState: GlobalState = {
  isLoading : false
};

const GlobalReducer = (
  state: GlobalState = initialState,
  action: GlobalActionTypes,
): GlobalState => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.isloading,
      };
    default:
      return state;
  }
};

export default GlobalReducer;

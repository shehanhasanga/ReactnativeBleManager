import {
  CLOSE_LOADER,
  CLOSE_SNACK_MESSAGE,
  GlobalsActionTypes,
  GlobalState
  , OPEN_LOADER,
  SHOW_SNACK_MESSAGE,
  TYPE_SUCCESS
} from "./types";


const initialState: GlobalsState = {
  snackMessage: {
    open: false,
    message: '',
  },
  snackMessages: [],
  loader: {
    open: false,
    count: 0,
  },
};

const GlobalReducer = (
  state: GlobalState = initialState,
  action: GlobalsActionTypes,
): GlobalState => {
  switch (action.type) {
    case SHOW_SNACK_MESSAGE:
      const snackMessages = [...state.snackMessages];
      const snack = {
        message: action.message,
        type: action.snackType ? action.snackType : TYPE_SUCCESS,
      };

      if (snackMessages.length > 0) {
        if (
            state.snackMessages[state.snackMessages.length - 1].message !==
            action.message
        ) {
          snackMessages.push(snack);
        }
      } else {
        snackMessages.push(snack);
      }

      if (snackMessages.length > 1) {
        return {
          ...state,
          snackMessages,
        };
      }
    case CLOSE_SNACK_MESSAGE:
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const [snackMessage, ...restSnackMessages] = state.snackMessages;
      /* eslint-enable @typescript-eslint/no-unused-vars */
      if (restSnackMessages.length > 0) {
        // Open snack message when one closed
        return {
          ...state,
          snackMessages: restSnackMessages,
          snackMessage: {
            ...restSnackMessages[0],
            open: true,
          },
        };
      }
      return {
        ...state,
        snackMessages: restSnackMessages,
        snackMessage: {
          ...initialState.snackMessage,
          open: false,
        },
      };
    case OPEN_LOADER:
      return {
        ...state,
        loader: {
          open: state.loader.count + 1 > 0,
          content: action.content,
          count: state.loader.count + 1,
        },
      };
    case CLOSE_LOADER:
      return {
        ...state,
        loader: {
          open: state.loader.count - 1 > 0,
          count: state.loader.count > 0 ? state.loader.count - 1 : 0,
        },
      };
    default:
      return state;
  }
};

export default GlobalReducer;

import {
  CLOSE_LOADER,
  CLOSE_SNACK_MESSAGE, CloseLoaderAction,
  CloseSnackAction,
  Loader, OPEN_LOADER,
  OpenLoaderAction,
  SHOW_SNACK_MESSAGE,
  ShowSnackAction,
  SnackTypes
} from "./types";


export const showSnackMessage = (
    message: string,
    snackType?: SnackTypes,
): ShowSnackAction => {
  return {
    type: SHOW_SNACK_MESSAGE,
    message,
    snackType,
  };
};

export const closeSnackMessage = (): CloseSnackAction => {
  return {
    type: CLOSE_SNACK_MESSAGE,
  };
};

export const openLoader = (
    content?: Pick<Loader, 'content'>,
): OpenLoaderAction => {
  return {
    type: OPEN_LOADER,
    content,
  };
};

export const closeLoader = (): CloseLoaderAction => {
  return {
    type: CLOSE_LOADER,
  };
};

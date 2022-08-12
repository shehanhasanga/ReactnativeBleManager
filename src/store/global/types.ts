
import {ReactNode} from 'react';
export const LOADING = 'LOADING';
export const TYPE_SUCCESS = 'success';
export const TYPE_ERROR = 'error';
export const TYPE_INFO = 'info';
export const TYPE_WARN = 'warning';
export interface LoadingAction {
    type: typeof LOADING;
    isloading: boolean;
}

export interface GlobalState {
    loader: Loader;
    snackMessage: SnackMessage
    snackMessages: Array<Omit<SnackMessage, 'open'>>;
}

export type SnackTypes =
    | typeof TYPE_SUCCESS
    | typeof TYPE_ERROR
    | typeof TYPE_INFO
    | typeof TYPE_WARN;

export interface SnackMessage {
    open: boolean;
    message: string;
    type?: SnackTypes;
}

export const SHOW_SNACK_MESSAGE = 'GLOBALS_SHOW_SNACK_MESSAGE';
export const CLOSE_SNACK_MESSAGE = 'GLOBALS_CLOSE_SNACK_MESSAGE';
export const OPEN_LOADER = 'GLOBALS_OPEN_LOADER';
export const CLOSE_LOADER = 'GLOBALS_CLOSE_LOADER';

export interface Loader {
    open: boolean;
    content?: ReactNode;
    count: number;
}

export interface ShowSnackAction {
    type: typeof SHOW_SNACK_MESSAGE;
    message: string;
    snackType?: SnackTypes;
}

export interface CloseSnackAction {
    type: typeof CLOSE_SNACK_MESSAGE;
}

export interface OpenLoaderAction {
    type: typeof OPEN_LOADER;
    content?: ReactNode;
}

export interface CloseLoaderAction {
    type: typeof CLOSE_LOADER;
}

export type GlobalsActionTypes =
    | ShowSnackAction
    | CloseSnackAction
    | OpenLoaderAction
    | CloseLoaderAction

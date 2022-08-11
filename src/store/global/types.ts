

export const LOADING = 'LOADING';

export interface LoadingAction {
    type: typeof LOADING;
    isloading: boolean;
}

export type GlobalActionTypes =
    | LoadingAction

export interface GlobalState {
    isLoading :  boolean
}

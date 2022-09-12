

export const GET_COMMON_PHYSICAL_ACTIVITIES = 'GET_COMMON_PHYSICAL_ACTIVITIES';
export const SET_COMMON_PHYSICAL_ACTIVITIES = 'SET_COMMON_PHYSICAL_ACTIVITIES';
export const GET_USER_IMPORTANT_THINGS = 'GET_USER_IMPORTANT_THINGS';
export const SET_USER_IMPORTANT_THINGS = 'SET_USER_IMPORTANT_THINGS';
export interface UserData {
    commonPhysicalActivities: [String];
    userImportantThings : [String];
}
export interface GetCommonPhysicalActivitiesAction {
    type: typeof GET_COMMON_PHYSICAL_ACTIVITIES;
}

export interface SetCommonPhysicalActivitiesAction {
    type: typeof SET_COMMON_PHYSICAL_ACTIVITIES;
    payload : [String]
}

export interface SetUserImportantThingsAction {
    type: typeof SET_USER_IMPORTANT_THINGS;
    payload : [String]
}

export interface GetUserImportantThingsAction {
    type: typeof GET_USER_IMPORTANT_THINGS;
}

export type UserdataActionTypes =
    | SetUserImportantThingsAction
    | SetCommonPhysicalActivitiesAction

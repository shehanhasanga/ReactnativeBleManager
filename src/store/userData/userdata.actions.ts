import {
    GET_COMMON_PHYSICAL_ACTIVITIES,
    GET_USER_IMPORTANT_THINGS,
    GetCommonPhysicalActivitiesAction,
    GetUserImportantThingsAction,
    SET_COMMON_PHYSICAL_ACTIVITIES,
    SET_USER_IMPORTANT_THINGS,
    SetCommonPhysicalActivitiesAction,
    SetUserImportantThingsAction
} from "./userdata.types";

export const getCommonPhysicalActivities = (
    userId: string,
): GetCommonPhysicalActivitiesAction => {
    return {
        type: GET_COMMON_PHYSICAL_ACTIVITIES,
    };
};

export const getGetUserImportantThings = (
    deviceId: string,
): GetUserImportantThingsAction => {
    return {
        type: GET_USER_IMPORTANT_THINGS,
    };
};

export const setGetUserImportantThings = (
    data : [String]
): SetUserImportantThingsAction => {
    return {
        type: SET_USER_IMPORTANT_THINGS,
        payload : data
    };
};

export const setCommonPhysicalActivities = (
    data : [String],
): SetCommonPhysicalActivitiesAction => {
    return {
        type: SET_COMMON_PHYSICAL_ACTIVITIES,
        payload : data
    };
};

import {
    SET_COMMON_PHYSICAL_ACTIVITIES, SET_USER_IMPORTANT_THINGS,
    UserData,
    UserdataActionTypes
} from "./userdata.types";
import storageReducer from "../storage/storage.reducer";


const initialState: UserData = {
    userImportantThings : [],
    commonPhysicalActivities : []
}

const userDataReducer = (
    state = initialState,
    action: UserdataActionTypes,
): UserData => {
    switch (action.type) {
        case SET_COMMON_PHYSICAL_ACTIVITIES:
            return {...state, commonPhysicalActivities : action.payload}
        case SET_USER_IMPORTANT_THINGS:
            return {...state, userImportantThings : action.payload}
        default:
            return state;
    }
}

export default userDataReducer;

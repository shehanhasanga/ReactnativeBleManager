import {call, put, takeEvery} from "redux-saga/effects";
import {
    GET_COMMON_PHYSICAL_ACTIVITIES,
    GET_USER_IMPORTANT_THINGS,
    GetCommonPhysicalActivitiesAction, GetUserImportantThingsAction
} from "./userdata.types";
import {getCommonPhysicalActivities, getUserImportantThings} from "../../services/api/authentication";
import {Session} from "../session/session.types";
import {setCommonPhysicalActivities, setGetUserImportantThings} from "./userdata.actions";


function* loadUserImportantThings(action: GetUserImportantThingsAction) {
    const response: Response = yield call(
        getUserImportantThings,
        action.userId,
    );
    console.log(response)
    const data = yield call([response, response.json]);
    if (data.error) {
        console.log(data.error)
    } else {
        console.log(data)
        yield put(setGetUserImportantThings(data.items))
    }
}

function* loadCommonPhysicalActivities(action: GetCommonPhysicalActivitiesAction) {
    const response: Response = yield call(
        getCommonPhysicalActivities,
        action.userId,
    );
    console.log(response)
    const data = yield call([response, response.json]);
    if (data.error) {
        console.log(data.error)
    } else {
        yield put(setCommonPhysicalActivities(data))
    }
}

export function* watchUserDataActions() {
    yield takeEvery(GET_USER_IMPORTANT_THINGS, loadUserImportantThings);
    yield takeEvery(GET_COMMON_PHYSICAL_ACTIVITIES, loadCommonPhysicalActivities);
}

import {
    FETCH_SESSION,
    FETCH_SESSION_FINISHED,
    FetchSessionAction,
    FetchSessionFinished,
    Session,
    START_SESSION,
    StartSessionAction,
    SYNC_COMMAND,
    SyncCommandWithDeviceAction,
    UPDATE_ELAPSE_TIME,
    UPDATE_SESSION,
    UpdateElapseTimeAction,
    UpdateSessionAction
} from "./session.types";


export const fetchSesstion = (
    deviceId: string,
    userId: string,
): FetchSessionAction => {
    return {
        type: FETCH_SESSION,
        deviceId,
        userId,
    };
};
export const fetchSessionFinished = (
    session : Session
): FetchSessionFinished => ({
    type: FETCH_SESSION_FINISHED,
    payload : session
});

export const startSessionAction = (
    deviceId : string
): StartSessionAction => ({
    type: START_SESSION,
    deviceId : deviceId,
});

export const updateSesstion = (
    deviceId: string,
    userId: string,
    elapseTime : number
): UpdateSessionAction => {
    return {
        type: UPDATE_SESSION,
        deviceId,
        userId,
        elapseTime
    };
};
export const syncCommandWithDeviceAction = (
): SyncCommandWithDeviceAction => ({
    type: SYNC_COMMAND,
});

export const updateElapseTimeAction = (
): UpdateElapseTimeAction => ({
    type: UPDATE_ELAPSE_TIME
});

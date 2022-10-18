import {ErrorResponse, FETCH_TOKEN, FetchTokenAction, MY_INFO_FAILED} from "../auth/auth.types";
import {ActionCommand} from "../bluetooth/bluetooth.types";

export interface TherapyConfig {
    pattern :  number,
    itensity : number,
    time : number,
    progress? : number
}

export interface SessionState {
    currentSession : TherapySession,
    sessionList : Array<Session>
}

export enum SessionEventTypes {
    SESSION_START = "SESSION_START",
    DEVICE_ON = "DEVICE_ON",
    MODE_CHANG = "MODE_CHANG",
    FREQUENCY_CHANG = "FREQUENCY_CHANG",
    STOP = "STOP",
    POWER_OFF = "POWER_OFF",
    HEARTBEAT = "HEARTBEAT"
}

export interface TherapySession {
    sessionId : string,
    deviceId : string,
    userId : string,
    event? :SessionEventTypes,
    eventInfo : {mode :  number, frequency :  number}
}

export interface Session {
    sessionId : string
    deviceIdAndroid : string,
    deviceIdIos : string,
    elapseTime: number,
    totalTime? : number,
    therapyList : Array<TherapyConfig>,
    isStarted? : boolean,
    commandArray? : Array<{key: number, commands?: Array<ActionCommand>}>,
}

export interface CommandArrayContent {
    deviceId : string,
    commandArray : Array<{key: number, commands?: Array<ActionCommand>}>
}

export const SAVE_SESSION = 'SAVE_SESSION';
export const FETCH_SESSION = 'FETCH_SESSION';
export const UPDATE_SESSION = 'UPDATE_SESSION';
export const FETCH_SESSION_FINISHED = 'FETCH_SESSION_FINISHED';
export const SYNC_COMMAND = 'SYNC_COMMAND';
export const UPDATE_ELAPSE_TIME  = 'UPDATE_ELAPSE_TIME';
export const START_SESSION  = 'START_SESSION';

export interface SaveSessionAction {
    type: typeof SAVE_SESSION;
    payload : {eventType : SessionEventTypes,  eventInfo : {mode: number, frequency : number}};
}

export interface FetchSessionAction {
    type: typeof FETCH_SESSION;
    deviceId : string;
    userId : string;
}

export interface StartSessionAction {
    type: typeof START_SESSION;
    deviceId : string;
}
export interface SyncCommandWithDeviceAction {
    type: typeof SYNC_COMMAND;
}


export interface UpdateSessionAction {
    type: typeof UPDATE_SESSION;
    deviceId : string;
    userId : string;
    elapseTime : number;
}

export type SessionActionTypes =
    | FetchSessionAction
    | UpdateSessionAction
    | FetchSessionFinished
    | StartSessionAction
    | UpdateElapseTimeAction

export interface FetchSessionFinished {
    type: typeof FETCH_SESSION_FINISHED;
    payload: Session;
    error?: ErrorResponse;
}

export interface UpdateElapseTimeAction {
    type: typeof UPDATE_ELAPSE_TIME;
}

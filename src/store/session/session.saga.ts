import {call, takeEvery, put} from "redux-saga/effects";
import {
    FETCH_SESSION,
    FetchSessionAction,
    Session, SessionState, START_SESSION, StartSessionAction, SYNC_COMMAND, SyncCommandWithDeviceAction,
    TherapyConfig,
    UPDATE_SESSION,
    UpdateSessionAction
} from "./session.types";
import {getSession, updateSession} from "../../services/session/session.service";
import {fetchSessionFinished, updateElapseTimeAction, updateSesstion} from "./session.action";
import Command, {CommandType} from "../../models/Ble/commands/Command";
import {store} from "../store";
import {ActionCommand} from "../bluetooth/bluetooth.types";
import {sendCommandWithActionCommand} from "../bluetooth/actions";
import {Platform} from "react-native";
import {miniSerializeError} from "@reduxjs/toolkit";



function* fetchSession(action: FetchSessionAction) {
    const response: Response = yield call(
        getSession,
        action.deviceId,
        action.userId,
    );
    console.log(response)
    const data = yield call([response, response.json]);
    if (data.error) {
        console.log(data.error)
    } else {
        let session:Session  = data
        yield put(fetchSessionFinished(session))
    }

}

function* updateSessionData(action: UpdateSessionAction) {

    const response: Response = yield call(
        updateSession,
        action.deviceId,
        action.userId,
        action.elapseTime
    );
    console.log(response)
    const data = yield call([response, response.json]);
    if (data.error) {
        console.log(data.error)
    } else {
        let session:Session  = data
        // yield put(fetchSessionFinished(session))
    }

}

const checkShouldSendCommand = (session : Session) : {shouldUpdate:boolean, commandArray? :Array<ActionCommand> } => {
    let shouldUpdate : boolean = false
    let commandArray : Array<ActionCommand> | undefined;
    if(session.commandArray){
        let elapsedTime = session.elapseTime  // check the next minute item
        elapsedTime += 1

        for(let m = 0 ; m < session.commandArray.length; m++){
            let item : {key: number, commands?: Array<ActionCommand>} = session.commandArray[m]
            if (item.key == elapsedTime){
                shouldUpdate = true
                commandArray = item.commands
                break
            }
        }
    }
    return {shouldUpdate,commandArray}
}


const getStartingCommands = (session : Session) : {commandArray? :Array<ActionCommand> } => {
    let commandArray : Array<ActionCommand> | undefined;
    if(session.commandArray){
        let elapsedTime = session.elapseTime

        for(let m = 0 ; m < session.commandArray.length; m++){
            let item : {key: number, commands?: Array<ActionCommand>} = session.commandArray[m]
            if (item.key == elapsedTime){
                commandArray = item.commands
                break
            } else if (item.key >= elapsedTime){
                if(m > 0) {
                    let previous : {key: number, commands?: Array<ActionCommand>} = session.commandArray[m-1]
                    commandArray = previous.commands
                    break
                }

            }
        }
    }
    return {commandArray}
}


const getSessionTotalTime = (session: Session) : number=> {
    let sum = 0
    for (let therapy of session.therapyList){
        sum += therapy.time
    }
    return sum
}

function* syncCommandWithDevice(action: SyncCommandWithDeviceAction) {
    let sessionData :SessionState = store.getState().session
    let shouldUpdateElapseTime = false;
    if(sessionData.sessionList.length > 0){
        for(let session of sessionData.sessionList){
            console.log("evaluating session has session id : " + session.sessionId + "session device is " + session.deviceIdAndroid + "device id ios" + session.deviceIdIos + "++++++++++++++++++++++++++")
            if(session.isStarted){
                console.log("found a started session in session saga ++++++++++++++++")
                console.log("elapse time : " +  session.elapseTime + " and the total time  : " + session.totalTime)
                let totalSessiontime: number = session.totalTime ? session.totalTime : getSessionTotalTime(session)
                if(session.elapseTime < totalSessiontime ){
                    shouldUpdateElapseTime = true

                    console.log("elapse time is less than the total therapy time for the session +++++++++++++++++++")
                    let updatedata : {shouldUpdate:boolean, commandArray? :Array<ActionCommand> } = checkShouldSendCommand(session)
                    if(updatedata.shouldUpdate){
                        console.log("showuld update the session +++++++++++++")
                        if(updatedata.commandArray){
                            if(updatedata.commandArray.length > 0) {
                                console.log("send command with action  command Array +++++++++++")
                                for(let actionCommand of updatedata.commandArray){
                                    console.log("send command with action  command Array ++++||||||||||||||||||||||+++++++" + actionCommand.commandType)
                                }
                                for(let actionCommand of updatedata.commandArray){
                                    console.log("send command with action  command +++++++++++")
                                    yield put(sendCommandWithActionCommand(actionCommand))
                                }
                            }
                        }
                    }
                    if( session.elapseTime != 0  && (session.elapseTime % 5 == 0)) {
                        // update db
                        console.log("update db +++++++++++++++")

                        yield put(updateSesstion("","", session.elapseTime + 1 ))
                    } else {
                        // update elapse time
                        // session.elapseTime += 1
                        let newSession:Session = {
                            sessionId : session.sessionId,
                            deviceIdAndroid : session.deviceIdAndroid,
                            deviceIdIos : session.deviceIdIos,
                            elapseTime: session.elapseTime + 1,
                            totalTime : session.totalTime,
                            therapyList : session.therapyList,
                            commandArray : session.commandArray
                        }
                    }
                }
            }
        }
    }
    if(shouldUpdateElapseTime){
        console.log("update elapse time +++++++++++++")
        yield put(updateElapseTimeAction())
    }
}

function* startSession(action: StartSessionAction) {
    let deviceId = action.deviceId
    console.log("session is started in device id" +  deviceId + "session sage ++++++++++++++++++++++")
    let sessionData :SessionState = store.getState().session
    let deviceSession :any
    if(sessionData.sessionList.length > 0){
        for(let session of sessionData.sessionList){
            if(Platform.OS == 'ios'){
                if(session.deviceIdIos == deviceId){ // session for the device
                    deviceSession =  session
                    break
                }
            } else {
                if(session.deviceIdAndroid == deviceId){ // session for the device
                    deviceSession =  session
                    break
                }
            }
        }
    }
    if(deviceSession){
        let commands  =  getStartingCommands(deviceSession)
        if(commands.commandArray){
            if(commands.commandArray.length > 0){
                for(let actionCommand of commands.commandArray){
                    yield put(sendCommandWithActionCommand(actionCommand))
                }
            }
        }

    }

}



export function* watchSessionActions() {
    yield takeEvery(FETCH_SESSION, fetchSession);
    yield takeEvery(UPDATE_SESSION, updateSessionData);
    yield takeEvery(SYNC_COMMAND, syncCommandWithDevice);
    yield takeEvery(START_SESSION, startSession);
}

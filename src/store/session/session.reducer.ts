import {
    FETCH_SESSION_FINISHED,
    Session,
    SessionActionTypes,
    SessionState,
    START_SESSION,
    TherapyConfig, UPDATE_ELAPSE_TIME
} from "./session.types";
import Command, {CommandType} from "../../models/Ble/commands/Command";
import {Platform} from "react-native";
import {ActionCommand} from "../bluetooth/bluetooth.types";


const initialState: SessionState = {
    sessionList : []
};

const sessionReducer = (
    state = initialState,
    action: SessionActionTypes,
): SessionState => {
    switch (action.type) {
        case FETCH_SESSION_FINISHED:
            var session : Session = action.payload
            let index = state.sessionList.findIndex((item) => item.sessionId != session.sessionId)
            const filtered = state.sessionList.filter((item) => item.sessionId != session.sessionId);
            if (index == -1) {
                let commandSession : Session = action.payload
                let updatedValue : {commandArray : Array<{key: number, commands?: Array<ActionCommand>}>, totalTime : number} = convertCommandMapToArray(action.payload)
                commandSession.commandArray = updatedValue.commandArray
                commandSession.totalTime = updatedValue.totalTime

                return {
                    ...state,
                    sessionList: filtered.concat(commandSession),
                }
            } else {
                return {
                    ...state,
                    sessionList: state.sessionList.map(item => item.sessionId == action.payload.sessionId? {...action.payload, commandArray: item.commandArray, totalTime : item.totalTime, isStarted : item.isStarted} : item)
                }
            }
        case UPDATE_ELAPSE_TIME:
            return {
                ...state,
                sessionList: state.sessionList.map(item =>  {
                    if(item.isStarted){
                        let totalTimeForSession = item.totalTime ? item.totalTime : getSessionTotalTime(item)
                        if(item.elapseTime < totalTimeForSession){
                            return {...item,elapseTime : item.elapseTime + 1}
                        } else {
                            return item
                        }
                    } else {
                        return item
                    }
                })
            }
        case START_SESSION:
            if(action.deviceId){
                if(Platform.OS == 'ios'){
                    return {
                        ...state,
                        sessionList: state.sessionList.map(item => item.deviceIdIos == action.deviceId? {...item, isStarted: true} : item)
                    }
                } else {
                    return {
                        ...state,
                        sessionList: state.sessionList.map(item => item.deviceIdAndroid == action.deviceId? {...item, isStarted: true} : item)
                    }
                }

            }
        default:
            return state
    }
}

const getCommandFromPattern = (pattern: number,deviceId: string) : ActionCommand => {
    let command
    if(pattern == 0){
        command = new Command(deviceId, CommandType.CHANGE_MODE_1)
    } else {
        command = new Command(deviceId, CommandType.CHANGE_MODE_2)
    }
    let blecommand : ActionCommand = {
        deviceId : command.deviceId,
        serviceUUID : command.serviceUUID,
        characteristicUUID : command.characteristicUUID,
        data : command.getCommandData(),
        commandType : command.type
    }
    return blecommand

}

const getCommandFromIntensity = (intensity: number, deviceId: string) : ActionCommand  => {
    let command
    if (intensity == 0) {
        command = new Command(deviceId, CommandType.CHANGE_INTENSITY_1)
    } else if (intensity == 1) {
        command = new Command(deviceId, CommandType.CHANGE_INTENSITY_2)
    } else {
        command = new Command(deviceId, CommandType.CHANGE_INTENSITY_3)
    }
    let blecommand : ActionCommand = {
        deviceId : command.deviceId,
        serviceUUID : command.serviceUUID,
        characteristicUUID : command.characteristicUUID,
        data : command.getCommandData(),
        commandType : command.type
    }
    return blecommand

}

const convertCommandMapToArray = (session: Session) :{commandArray : Array<{key: number, commands?: Array<ActionCommand>}>, totalTime : number}  => {
   let data: {totalTime : number, commandArrayMap : Map<number, Array<ActionCommand>> } = getCommandMap(session)
    let commandMap : Map<number, Array<ActionCommand>> =  data.commandArrayMap;
    let commandArray: Array<{key: number, commands?: Array<ActionCommand>}> = []
    for (let key of commandMap.keys()){
        let item = {
            key :  key,
            commands  :  commandMap.get(key)
        }
        commandArray.push(item)
    }
   let returnVal : {commandArray : Array<{key: number, commands?: Array<ActionCommand>}>, totalTime : number} = {
        commandArray : commandArray,
       totalTime : data.totalTime
   }
    return returnVal;

}
const getSessionTotalTime = (session: Session) : number=> {
    let sum = 0
    for (let therapy of session.therapyList){
        sum += therapy.time
    }
    return sum
}
const getCommandMap = (session: Session) : {totalTime : number, commandArrayMap : Map<number, Array<ActionCommand>> } => {
    let sum = 0
    let commandMap = new Map<number, Array<ActionCommand>>()
    let deviceId =  Platform.OS === 'ios' ? session.deviceIdIos : session.deviceIdAndroid
    for(let i = 0 ; i < session.therapyList.length ; i++){
        let timeSoFar = sum;
        let therapyConfig:TherapyConfig = session.therapyList[i]
        let intensityCommand : ActionCommand = getCommandFromIntensity(therapyConfig.itensity, deviceId);
        let patternCommand : ActionCommand = getCommandFromPattern(therapyConfig.pattern, deviceId);
        let commandArray: Array<ActionCommand> = new Array<ActionCommand>();
        commandArray.push(patternCommand)
        commandArray.push(intensityCommand)
        commandMap.set(sum, commandArray);
        if(session.therapyList[i].time > 10){
            let therapychnangeTime = Math.trunc(session.therapyList[i].time / 10)
            console.log("therapychnangeTime" + therapychnangeTime)
            for(let k = 0 ; k < therapychnangeTime ; k++){
                let changingArray = new Array<ActionCommand>();
                let time = timeSoFar + (5 * (k + 1))
                changingArray.push(getCommandFromPattern(Math.abs(therapyConfig.pattern - 1), deviceId))
                changingArray.push(getCommandFromPattern(therapyConfig.pattern, deviceId))
                commandMap.set(time, changingArray);
            }
        }
        sum += session.therapyList[i].time
    }
    let pauseCommand = new Command(deviceId, CommandType.PAUSE)
    let blecommand : ActionCommand = {
        deviceId : pauseCommand.deviceId,
        serviceUUID : pauseCommand.serviceUUID,
        characteristicUUID : pauseCommand.characteristicUUID,
        data : pauseCommand.getCommandData(),
        commandType : pauseCommand.type
    }
    let pauseCommandArray = new Array<ActionCommand>();
    pauseCommandArray.push(blecommand)
    commandMap.set(sum, pauseCommandArray)
    return {totalTime : sum, commandArrayMap : commandMap }
}

export default sessionReducer;

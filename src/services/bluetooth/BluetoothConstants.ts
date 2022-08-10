import {Platform} from "react-native";

export const  AdapterState = {
    Unknown : 'Unknown',
    Resetting : 'Resetting',
    Unsupported : 'Unsupported',
    Unauthorized : 'Unauthorized',
    PoweredOff : 'off',
    PoweredOn : 'on'
}


export const getNotificationChar = () :string => {
    if(Platform.OS === 'ios') {
        return "ae02"
    } else {
        return "0000ae02-0000-1000-8000-00805f9b34fb"
    }
}

export const getCommandSendingChar = (): string=> {
    if(Platform.OS === 'ios') {
        return "ae01"
    } else {
        return "0000ae01-0000-1000-8000-00805f9b34fb"
    }
}

export const getServiceUUID = (): string => {

    if(Platform.OS === 'ios') {
        return "ae00"
    } else {
        return "0000ae00-0000-1000-8000-00805f9b34fb"
    }
}

import {BluetoothPeripheral} from "../../models/BluetoothPeripheral";
import bluetoothReducer from "./bluetooth.reducer";
import {BleDevice} from "../../models/Ble/BleDevice";
import {DeviceStatus} from "../../models/Ble/DeviceStatus";
import {Session} from "../session/session.types";

export const GET_ADAPTER_STATUS = 'ADAPTER_STATUS';
export const GET_SERVICES_INFO = 'GET_SERVICES_INFO';
export const SEND_COMMAND = 'SEND_COMMAND';
export const SEND_COMMANDS = 'SEND_COMMANDS';
export const GET_DEVICESTATUS = 'GET_DEVICESTATUS';
export const SEND_COMMAND_ACK = 'SEND_COMMAND_ACK'

export const START_SCAN_DEVICES = 'START_SCAN_DEVICES'
export const STOP_SCAN_DEVICES = 'STOP_SCAN_DEVICES'
export const DEVICE_FOUND = 'DEVICE_FOUND'
export const INITIATE_CONNECTION = 'INITIATE_CONNECTION'
export const SCAN_DETACHED_DEVICES = 'SCAN_DETACHED_DEVICES'
export const DISCONNECT_FROM_DEVICE = 'DISCONNECT_FROM_DEVICE'
export const DISCONNECTED_FROM_DEVICE = 'DISCONNECTED_FROM_DEVICE'
export const SEND_CONNECTION_SUCCESS = 'SEND_CONNECTION_SUCCESS'
export const SEND_CONNECTION_FAIL = 'SEND_CONNECTION_FAIL'
export const SEND_DEVICE_STATUS = 'SEND_DEVICE_STATUS'
export const SEND_ADAPTER_STATUS = 'SEND_ADAPTER_STATUS'


export const START_TIMER = 'START_TIMER'
export const SEND_TIME_VALUE = 'SEND_TIME_VALUE'
export const RESET_COMMAND_TIMER = 'RESET_COMMAND_TIMER'

export enum AckType {
    STOP = 'STOP',
    START = 'START',
    PAUSE = 'PAUSE',
    POWER_OFF = 'POWER_OFF',
    CHANGE_MODE_1 = 'CHANGE_MODE_1',
    CHANGE_MODE_2 = 'CHANGE_MODE_2',
    CHANGE_INTENSITY_1 = 'CHANGE_INTENSITY_1',
    CHANGE_INTENSITY_2 = 'CHANGE_INTENSITY_2',
    CHANGE_INTENSITY_3 = 'CHANGE_INTENSITY_3'
}

export interface BluetoothState {
    availableDevices: Array<BleDevice>;
    isConnectingToDevice: boolean;
    connectedDevice: BleDevice;
    connectedDeviceList : Array<BleDevice>;
    isScanning: boolean;
    adapterStatus : any;
    devicesStatus: Array<BleDevice>;
    deviceSt : DeviceStatus;
    timerValue : number,
    sessionData? :Session,
    sessionTime : number
}




export interface ActionCommand {
    deviceId : string,
    data : string,
    serviceUUID :string,
    characteristicUUID : string,
    commandType: string
}

export interface CommandAck {
    deviceId : string,
    ackType: string
}

export interface GetAdapterStatus {
    type: typeof GET_ADAPTER_STATUS;
}

export interface GetServiceInfo {
    type: typeof GET_SERVICES_INFO;
    payload : string
}

export interface SendCommand {
    type: typeof SEND_COMMAND;
    payload : ActionCommand
}

export interface SendCommands {
    type: typeof SEND_COMMANDS;
    payload : { actionCommands : ActionCommand[], time : number, eventInfo : {mode: number, frequency : number}}
}


export interface GetDeviceStatusData {
    type: typeof GET_DEVICESTATUS;
    payload : ActionCommand
}

export type BluetoothActionTypes =
    | GetAdapterStatus
    | GetServiceInfo
    | SendCommand
    | GetDeviceStatusData
    | SendAckForCommand

export interface SendAckForCommand {
    type: typeof SEND_COMMAND_ACK;
    payload : CommandAck
}


// Ble manager actions
export type BluetoothAdapterActionTypes =
    | StartScanDevicesAction
    | StopScanAction
    | DeviceFoundAction
    | InitiateConnectionAction
    | SendConnectSuccessAction
    | SendConnectFailAction
    | SendDeviceStatusAction
    | SendAdapterStatusAction
    | SendTimerValues
    | DisconnectedSuccessAction
    | ResetCommandTimer

export interface StartScanDevicesAction {
    type: typeof START_SCAN_DEVICES
}

export interface StopScanAction {
    type: typeof STOP_SCAN_DEVICES
}

export interface DeviceFoundAction {
    type: typeof DEVICE_FOUND
    payload : BleDevice
}

export interface InitiateConnectionAction {
    type: typeof INITIATE_CONNECTION
    payload : any
}
export interface ScanAndConnectDetachedDevice {
    type: typeof SCAN_DETACHED_DEVICES
}

export interface DisconnectDeviceAction {
    type: typeof DISCONNECT_FROM_DEVICE
    payload : any
}

export interface DisconnectedSuccessAction {
    type: typeof DISCONNECTED_FROM_DEVICE
    payload : any
}


export interface SendConnectSuccessAction {
    type: typeof SEND_CONNECTION_SUCCESS
    payload : BleDevice
}

export interface SendConnectFailAction {
    type: typeof SEND_CONNECTION_FAIL
    payload : boolean
}

export interface SendDeviceStatusAction {
    type: typeof SEND_DEVICE_STATUS
    payload : BleDevice
}

export interface SendAdapterStatusAction {
    type: typeof SEND_ADAPTER_STATUS
    payload : string
}

export interface StartTimerAction {
    type: typeof START_TIMER
    payload : number
}

export interface SendTimerValues {
    type: typeof SEND_TIME_VALUE
    payload : number
}

export interface ResetCommandTimer {
    type: typeof RESET_COMMAND_TIMER
    payload : number
}

import {Device} from 'react-native-ble-plx';
import {AnyAction} from 'redux';
import {END, eventChannel, TakeableChannel} from 'redux-saga';
import {call, cancelled, fork, put, take, takeEvery, takeLatest} from 'redux-saga/effects';
import {sagaActionConstants} from './bluetooth.reducer';
import bluetoothLeManager, {BLECommand} from '../../services/bluetooth/BluetoothLeManager';
import {
  actionTypes,
  deviceFoundAction,
  disconnectedSuccessAction,
  getCurrentDeviceStatusData,
  scanAndConnectDetachedDevice,
  sendAdapterStatusAction,
  sendConnectFailAction,
  sendConnectSuccessAction,
  sendDeviceStatusAction,
  sendTimeValues,
  startTimerAction,
    sendCommand as sendCommandAction
} from "./actions";
import {
  ActionCommand,
  DISCONNECT_FROM_DEVICE,
  GET_ADAPTER_STATUS,
  GET_DEVICESTATUS,
  INITIATE_CONNECTION,
  SCAN_DETACHED_DEVICES,
  SEND_COMMAND,
  START_SCAN_DEVICES,
  START_TIMER,
  STOP_SCAN_DEVICES
} from "./bluetooth.types";
import {BleDevice} from "../../models/Ble/BleDevice";
import {store} from '../store';
import blemanager, {AdapterPayload, StreamingTypes} from "../../services/bluetooth/BLEManager";
import Command, {CommandType} from "../../models/Ble/commands/Command";
import {startSessionAction, syncCommandWithDeviceAction} from "../session/session.action";

type TakeableDevice = {
  payload: {id: string; name: string; serviceUUIDs: string};
  take: (cb: (message: any | END) => void) => Device;
};

type TakeableHeartRate = {
  payload: {};
  take: (cb: (message: any | END) => void) => string;
};

function* watchForPeripherals(): Generator<AnyAction, void, TakeableDevice> {
  const onDiscoveredPeripheral = () =>
    eventChannel(emitter => {
      // return bluetoothLeManager.scanForPeripherals(emitter);
      blemanager.scanForPeripherals(emitter)
      return () => {
        blemanager.stopScanningForPeripherals();
      };
    });

  const channel: TakeableChannel<Device> = yield call(onDiscoveredPeripheral);

  try {
    while (true) {
      const response = yield take(channel);

      let bleDevice: BleDevice = {
        id : response.payload.id,
        name : response.payload.name
      }
      yield put(deviceFoundAction(bleDevice));
    }
  } catch (e) {
    console.log(e);
  }
}

function* stopScanning(action: {
  type: typeof STOP_SCAN_DEVICES;
  payload: string;
}) {
  // yield call(bluetoothLeManager.stopScanningForPeripherals);
  yield call(blemanager.stopScanningForPeripherals);
}

function* getAdapterStatus(action: {
  type: typeof actionTypes.ADAPTER_STATUS;
  payload: string;
}) {
  let status:string = yield call(bluetoothLeManager.getBLuetoothState);
  yield put({
    type: sagaActionConstants.GET_ADAPTER_STATUS_SUCCESS,
    payload: status,
  });
}

function* scanAndConnectDetachedDevices(action: {
  type: typeof SCAN_DETACHED_DEVICES;
  payload: any;
}) {
  try{
    console.log("checking disconnected devices++++++++++++++++")
    let available: boolean = yield call(blemanager.isDisconnectedDeviceAvailable);
    if(available){
      let status: any =  yield  call(blemanager.scanAndConnectDetachedDevices)
      if(status.isconnected){ // has connect to a detached device
        console.log("connected to a disconnected devices++++++++++++++++" + status.connectedDevice.name)
        let bleDevice: BleDevice = {
          id: status.connectedDevice.id,
          name: status.connectedDevice.name,
        }
        // yield call(blemanager.stopScanningForPeripherals);
        yield put(getCurrentDeviceStatusData(bleDevice.id));
        // yield put(sendConnectSuccessAction(bleDevice));
      }
    }

  } catch (e) {
    // yield put(sendConnectFailAction(false));
  }
}



function* connectToPeripheral(action: {
  type: typeof INITIATE_CONNECTION;
  payload: any;
}) {
  const peripheralId = action.payload.id;
  try{
    let device: Device = yield call(blemanager.connectToPeripheral, peripheralId,action.payload.name);
    let bleDevice: BleDevice = {
      id: peripheralId,
      name: action.payload.name,
    }
    yield call(blemanager.stopScanningForPeripherals);
    yield put(getCurrentDeviceStatusData(peripheralId));
    // yield put(sendConnectSuccessAction(bleDevice));
    yield put(startTimerAction(200, true));
  } catch (e) {
    yield put(sendConnectFailAction(false));
  }




  // let device: Device = yield call(bluetoothLeManager.connectToPeripheral, peripheralId);
  // let bleDevice: BleDevice = {
  //   id: device.id,
  //   name: device.name ? device.name : '',
  // }
  // yield put(sendConnectSuccessAction(bleDevice))
  // yield call(bluetoothLeManager.stopScanningForPeripherals);
  // yield put(getCurrentDeviceStatusData(device.id));
}

function* disconnectFromDevice(action: {
  type: typeof DISCONNECT_FROM_DEVICE;
  payload: any;
}) {
  const peripheralId = action.payload.id;
  try{
    let success: any = yield call(blemanager.disconnectFromPeripheral, peripheralId);
    // yield put(disconnectedSuccessAction(peripheralId, true));
  } catch (e) {
    yield put(disconnectedSuccessAction(peripheralId, false));
  }
}

function* getAdapterUpdates() {
  const onAdapterSatteUpdate = () =>
      eventChannel(emitter => {
        // bluetoothLeManager.startStreamingAdapterStateData(emitter);
        blemanager.startStreamingAdapterStateData(emitter);
        return () => {
          // bluetoothLeManager.removeAdapterSubscription();
          blemanager.removeAdapterSubscription();
        };
      });

  const channel: TakeableChannel<string> = yield call(onAdapterSatteUpdate);
  try {
    while (true) {
      const status = yield take(channel);
      let payload : AdapterPayload = status.payload
      if(payload.type == StreamingTypes.ADAPTER_DATA){
        let status = payload.data.bleStatus? payload.data.bleStatus : "undefined"
        yield put(sendAdapterStatusAction(status));
      } else if(payload.type == StreamingTypes.DEVICE_DATA){
        if(payload.data.isConnected){
          let bleDevice: BleDevice = {
            id: payload.data.deviceId,
            name: payload.data.name,
            isConnected : true,
          }
          yield put(sendConnectSuccessAction(bleDevice));
          if(payload.data.deviceId){
            let deviceIdentifier = payload.data.deviceId ? payload.data.deviceId : ""
            // let pauseCommand  = new Command(deviceIdentifier, CommandType.PAUSE)
            // let bleCommand : BLECommand = {
            //   deviceId : pauseCommand.deviceId,
            //   data : pauseCommand.getCommandData(),
            //   serviceUUID :pauseCommand.serviceUUID,
            //   characteristicUUID : pauseCommand.characteristicUUID
            // }
            // yield fork(blemanager.writeCharacteristicWithResponse, bleCommand);
            yield put(sendCommandAction(new Command(deviceIdentifier, CommandType.PAUSE)))
          }

        } else {
          let deviceId = payload.data.deviceId? payload.data.deviceId : ""
          yield put(disconnectedSuccessAction(deviceId, true));
        }
      }

    }
  } catch (e) {
    console.log(e);
  }
}

 const convertActionCommandToBleCommand = (actionCommand: ActionCommand) : BLECommand => {
 let bleCommand : BLECommand = {
   deviceId : actionCommand.deviceId,
   serviceUUID : actionCommand.serviceUUID,
   characteristicUUID : actionCommand.characteristicUUID,
   data : actionCommand.data
 }
 return bleCommand;
}

function* sendCommand(action: {
  type: typeof SEND_COMMAND;
  payload: ActionCommand;
}) {
  console.log("store state from the saga ++++++++++")
  console.log(store.getState().bluetooth)
  console.log("got the command request ++++++++++++++++++++++++++++++++" + action.payload.commandType)
  let actioncommand = action.payload
  let bleCommand : BLECommand = convertActionCommandToBleCommand(actioncommand);
  // let success = yield fork(bluetoothLeManager.writeCharacteristicWithResponse,bleCommand)
  let success = yield fork(blemanager.writeCharacteristicWithResponse,bleCommand)
  if(actioncommand.commandType == CommandType.START){
    yield put(startSessionAction(actioncommand.deviceId));
  }
  // let ack :CommandAck = {deviceId:actioncommand.deviceId, ackType:actioncommand.commandType}
  // yield put(sendAckForCommand(ack));
}


function* getHeartRateUpdates(): Generator<AnyAction, void, TakeableHeartRate> {
  const onHeartrateUpdate = () =>
    eventChannel(emitter => {
      bluetoothLeManager.startStreamingData(emitter);

      return () => {
        bluetoothLeManager.stopScanningForPeripherals();
      };
    });

  const channel: TakeableChannel<string> = yield call(onHeartrateUpdate);

  try {
    while (true) {
      const response = yield take(channel);
      yield put({
        type: sagaActionConstants.UPDATE_HEART_RATE,
        payload: response.payload,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getDeviceStatusUpdates(action: {
  type: typeof GET_DEVICESTATUS;
  payload: ActionCommand;
}) {
  console.log("got command to the saga ++++++++++++++++")
  let bleCommand = convertActionCommandToBleCommand(action.payload)
  const onStatusUpdate = () =>
      eventChannel(emitter => {
        blemanager.startDeviceStatusStreamingdata(emitter, bleCommand);
        // let subscription :Subscription = bluetoothLeManager.startDeviceStatusStreamingdata(emitter, bleCommand);

        return () => {
          // subscription.remove();
          blemanager.removeDeviceStatusStreamingdata();
        };
      });

  const channel: TakeableChannel<string> = yield call(onStatusUpdate);

  try {
    while (true) {
      const response = yield take(channel);
      yield put(sendDeviceStatusAction(response.payload));
      // yield put({
      //   type: sagaActionConstants.GET_DEVICE_UPDATES,
      //   payload: response.payload,
      // });
    }
  } catch (e) {
    console.log(e);
  }
}

function countdown(secs) {
  return eventChannel(emitter => {
        const iv = setInterval(() => {
          secs -= 1
          if (secs > 0) {
            emitter(secs)
          } else {
            // this causes the channel to close
            secs = 200
          }
        }, 1000);
        // The subscriber must return an unsubscribe function
        return () => {
          clearInterval(iv)
        }
      }
  )
}

export function* timerSaga(action: {
  type: typeof START_TIMER;
  payload: {timeout: number , enable : boolean};
}) {
  console.log("timer started")
  console.log(action.payload)
  if(action.payload.enable){
    const chan:any = yield call(countdown, action.payload.timeout)
    try {
      while (true) {
        // take(END) will cause the saga to terminate by jumping to the finally block
        let seconds = yield take(chan)
        yield put(sendTimeValues(seconds))
        if((seconds != 0) && (seconds % 30 == 0)){
          yield put(scanAndConnectDetachedDevice())
        }
        if((seconds != 0) && (seconds % 10 == 0)){
          console.log("send a session sync command  +++++++++++++++++++++++++++++++++++")
          yield put(syncCommandWithDeviceAction())
        }
      }
    } finally {
      if (yield cancelled()) {
        chan.close()
        console.log('countdown cancelled')
      }
    }
  }

}


export function* bluetoothSaga() {
  yield takeEvery(
      START_SCAN_DEVICES,
    watchForPeripherals,
  );
  yield takeEvery(INITIATE_CONNECTION, connectToPeripheral);
  yield takeEvery(STOP_SCAN_DEVICES, stopScanning);
  yield takeEvery(
    sagaActionConstants.START_HEART_RATE_SCAN,
    getHeartRateUpdates,
  );
  yield takeEvery(GET_ADAPTER_STATUS, getAdapterUpdates);
  yield takeEvery(SEND_COMMAND, sendCommand);
  yield takeEvery(GET_DEVICESTATUS, getDeviceStatusUpdates);
  yield takeEvery(DISCONNECT_FROM_DEVICE, disconnectFromDevice);

  yield takeLatest(START_TIMER, timerSaga);
  yield takeLatest(SCAN_DETACHED_DEVICES, scanAndConnectDetachedDevices);
}

import {
  BluetoothAdapterActionTypes,
  BluetoothState,
  DEVICE_FOUND,
  DISCONNECTED_FROM_DEVICE,
  INITIATE_CONNECTION,
  SEND_ADAPTER_STATUS,
  SEND_CONNECTION_FAIL,
  SEND_CONNECTION_SUCCESS,
  SEND_DEVICE_STATUS,
  SEND_TIME_VALUE,
  START_SCAN_DEVICES,
  STOP_SCAN_DEVICES,
} from './bluetooth.types';
import {BleDevice} from '../../models/Ble/BleDevice';
import {DeviceStatus} from "../../models/Ble/DeviceStatus";

const initialState: BluetoothState = {
  availableDevices: [],
  isConnectingToDevice: false,
  connectedDevice: null,
  connectedDeviceList: [],
  isScanning: false,
  adapterStatus: '',
  devicesStatus: [],
  timerValue : 0,
  sessionData: []
};

const BLEReducer = (
  state: BluetoothState = initialState,
  action: BluetoothAdapterActionTypes,
): BluetoothState => {
  switch (action.type) {
    case START_SCAN_DEVICES:
      return {
        ...state,
        isScanning: true,
      };
    case STOP_SCAN_DEVICES:
      return {
        ...state,
        isScanning: false,
      };
    case DEVICE_FOUND:
      const isDuplicate = state.availableDevices.some(
        device => device.id === action.payload.id,
      );
      if (!isDuplicate) {
        let availableDevices = state.availableDevices.concat(action.payload);
        return {
          ...state,
          availableDevices: availableDevices,
        };
      }

    case INITIATE_CONNECTION:
      return {
        ...state,
        isConnectingToDevice: true,
      };
    case SEND_CONNECTION_SUCCESS:
      // var device: BleDevice = action.payload;
      // state.connectedDeviceList.push(device);
      return {
        ...state,
        isConnectingToDevice: false,
        availableDevices : [],
        connectedDeviceList: state.connectedDeviceList.concat(action.payload),
      };
    case DISCONNECTED_FROM_DEVICE:
      if(action.payload.success){
        let deviceId = action.payload.id;
        return {
          ...state,
          connectedDeviceList: state.connectedDeviceList.filter(item => item.id !== deviceId),
        };
      }


    case SEND_CONNECTION_FAIL:
      return {
        ...state,
        isConnectingToDevice: false,
      };
    case SEND_DEVICE_STATUS:
      var device : BleDevice = action.payload
      const index = state.devicesStatus.findIndex((item) => item.id === device.id);
      if(index != -1){
        let deviceStatus :DeviceStatus = device.status
        return {
          ...state,
          devicesStatus: state.devicesStatus.map(
              (content, i) => content.id === device.id ? {...content, status: deviceStatus}
                  : content
          )
        }
      } else {
        return {
          ...state,
          devicesStatus: state.devicesStatus.concat(action.payload),
        }
      }
    case SEND_ADAPTER_STATUS:
      return {
        ...state,
        adapterStatus: action.payload,
      };
    case SEND_TIME_VALUE:
      return {
        ...state,
        timerValue : action.payload,
      };
    default:
      return state;
  }
};

export default BLEReducer;

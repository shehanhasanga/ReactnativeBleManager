import {LOADING, LoadingAction} from "./types";
import {StartScanDevicesAction} from "../bluetooth/bluetooth.types";





export const sendAckForCommand = (isloading: boolean): LoadingAction => {
  return {
    type: LOADING,
    payload: isloading,
  };
};


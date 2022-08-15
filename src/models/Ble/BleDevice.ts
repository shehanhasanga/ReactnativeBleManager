import {DeviceStatus} from './DeviceStatus';

export type BleDevice = {
  id: string;
  name?: string;
  isConnected? : boolean,
  status?: DeviceStatus;
  serviceUUIDs?: Array<string>;
  isSendingCommand?: boolean;
};

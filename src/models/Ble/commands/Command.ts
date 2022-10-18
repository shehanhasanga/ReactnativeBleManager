import {getCommandSendingChar, getServiceUUID} from "../../../services/bluetooth/BluetoothConstants";

export enum CommandType {
  STOP = 'STOP',
  START = 'START',
  PAUSE = 'PAUSE',
  POWER_OFF = 'POWER_OFF',
  CHANGE_MODE_1 = 'CHANGE_MODE_1',
  CHANGE_MODE_2 = 'CHANGE_MODE_2', // graduated command
  CHANGE_INTENSITY_1 = 'CHANGE_INTENSITY_1',
  CHANGE_INTENSITY_2 = 'CHANGE_INTENSITY_2',
  CHANGE_INTENSITY_3 = 'CHANGE_INTENSITY_3',
}

const CommandContent = (commandType: CommandType): string => {
    switch (commandType) {
      // case CommandType.START:
      //   return "QVQjU1Q"
      // case CommandType.POWER_OFF:
      //   return "QVQjT0Y"
      // case CommandType.PAUSE:
      //   return "QVQjUFM"
      // case CommandType.CHANGE_MODE_2:
      //   return "QVQjTTI"
      // case CommandType.CHANGE_MODE_1:
      //   return "QVQjTTE"
      // case CommandType.CHANGE_INTENSITY_3:
      //   return "QVQjSTM"
      // case CommandType.CHANGE_INTENSITY_2:
      //   return "QVQjSTI"
      // case CommandType.CHANGE_INTENSITY_1:
      //   return "QVQjSTE"

      case CommandType.START:
        return "AT#ST"
      case CommandType.POWER_OFF:
        return "AT#OF"
      case CommandType.PAUSE:
        return "AT#PS"
      case CommandType.CHANGE_MODE_2:
        return "AT#M2"
      case CommandType.CHANGE_MODE_1:
        return "AT#M1"
      case CommandType.CHANGE_INTENSITY_3:
        return "AT#I3"
      case CommandType.CHANGE_INTENSITY_2:
        return "AT#I2"
      case CommandType.CHANGE_INTENSITY_1:
        return "AT#I1"
    }
}

class Command {
  private _deviceId: string;
  private _type: CommandType;
  constructor(deviceId: string, type: CommandType) {
    this._deviceId = deviceId;
    this._type = type;
  }
  getCommandData(): string {
    return CommandContent(this.type);
  }

  get deviceId(): string {
    return this._deviceId;
  }

  get type(): CommandType {
    return this._type;
  }
  get serviceUUID(): string {
    return getServiceUUID();
  }

  set serviceUUID(value: string) {}

  get characteristicUUID(): string {
    return getCommandSendingChar();
  }

  set characteristicUUID(value: string) {}
}
export default Command;

import BleManager from "react-native-ble-manager";
import {NativeEventEmitter, NativeModules} from "react-native";
import {BleError, Characteristic, Subscription} from "react-native-ble-plx";
import {DeviceStatus} from "../../models/Ble/DeviceStatus";
import {BleDevice} from "../../models/Ble/BleDevice";


export interface BLECommand {
    deviceId : string,
    data : string,
    serviceUUID :string,
    characteristicUUID : string
}

class BLEManager {
    private  BleManagerModule = NativeModules.BleManager;
    private bleManagerEmitter = new NativeEventEmitter(this.BleManagerModule);
    private emiter: any;
    private emiterScan : any;
    private adapterEmiter: any;

    constructor() {
        this.bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.bleManagerEmitter.addListener('BleManagerDidUpdateState', this.handleBleState);

        this.bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
        BleManager.start({ showAlert: false }).then(() => {
            // Success code
            console.log("Module initialized");
        });
        BleManager.checkState();
    }

    handleBleState = (data) => {
        if(this.adapterEmiter){
            this.adapterEmiter({payload :data.state})
        }
    }

    startStreamingAdapterStateData = (emiter:any) => {
        this.adapterEmiter = emiter
    }
    removeAdapterSubscription = () => {
        this.adapterEmiter = null
    }

    handleDiscoverPeripheral = (peripheral) => {
        if(this.emiterScan){
            let data = {
                id :  peripheral.id,
                name : peripheral.name
            }
            this.emiterScan({payload: data})
        }

    }

    scanForPeripherals = (emiterScan : any) => {
        BleManager.scan([], 65, false).then(() => {
            console.log("scanning devices")
        });
        this.emiterScan = emiterScan;

    };




    stopScanningForPeripherals = () => {
        BleManager.stopScan().then(() => {
            console.log("Scan stopped");
        });
    };

    connectToPeripheral = async (identifier: string) => {
        console.log("blemanager id" + identifier+ "+++++++++++")
        await BleManager.connect(identifier)
            .then(() => {
                // Success code
                console.log("Connected");
            })
            .catch((error) => {
                // Failure code
                console.log(error);
            });
    }

    handleUpdateValueForCharacteristic = (data) => {
        if(this.emiter){
            this.emiter(data.value)
        }
    }

    writeCharacteristicWithResponse = async (command: BLECommand) => {
        await BleManager.writeWithoutResponse(
            command.deviceId,
            command.serviceUUID,
            command.characteristicUUID,
            [41, 54, 23, 53, 54]
        )
        return true;
    }
    removeDeviceStatusStreamingdata = () => {
        this.emiter = null
    }

    enableNotifications = async (command : BLECommand) => {
        console.log("enable notifi id :" + command.characteristicUUID)
        console.log("enable notifi id :" + command.serviceUUID)
        console.log("enable notifi id :" + command.deviceId)
        await BleManager.retrieveServices(command.deviceId)
        await BleManager.startNotification(
            command.deviceId,
            command.serviceUUID,
            command.characteristicUUID
        )
            .then(() => {
                // Success code
                console.log("Notification started");
            })
            .catch((error) => {
                // Failure
                console.log("Notification failed");
                console.log(error);
            });
    }

    startDeviceStatusStreamingdata =  async (

        emitter: (arg0: { payload: number | BleError }) => void, command : BLECommand
    )  => {
       this.emiter = await this.readNotificationData(command , emitter)
    };

    readNotificationData = async (command : BLECommand, emitter: (arg0: { payload:any }) => void) => {
        await this.enableNotifications(command)
        return    (data : any) => {
            let udata  = data
            let deviceStatus : DeviceStatus = {
                pressureTop : udata[0] * 256  + udata[1],
                batteryVal : udata[2],
                pressureMid : udata[3] * 256 + udata[4],
                unidentified_1 : udata[5],
                pressureLow : udata[6] * 256 + udata[7],
                pwmTop : udata[8],
                pwmMid : udata[9],
                pwmLow : udata[10],
                keepWorkTime : udata[11] * 256 + udata[12],
                apWorkMode : udata[13],
                intensityFlag : udata[14] - 1,
                modeStep : udata[15],
                stepTime : udata[16],
                pauseFlag : udata[17],
            }
            let bleDevice : BleDevice = {
                id : command.deviceId,
                status : deviceStatus
            }
            console.log(deviceStatus.batteryVal)
            emitter({
                payload: bleDevice
            })
        }
    }
    base64ToBytesArr = (str) => {
        const abc = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"]; // base64 alphabet
        let result = [];

        for (let i = 0; i < str.length / 4; i++) {
            let chunk = [...str.slice(4 * i, 4 * i + 4)]
            let bin = chunk.map(x => abc.indexOf(x).toString(2).padStart(6, 0)).join('');
            let bytes = bin.match(/.{1,8}/g).map(x => +('0b' + x));
            result.push(...bytes.slice(0, 3 - (str[4 * i + 2] == "=") - (str[4 * i + 3] == "=")));
        }
        return result;
    }


}
const blemanager = new BLEManager()
export  default blemanager;

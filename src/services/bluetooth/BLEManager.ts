import BleManager, {Peripheral} from "react-native-ble-manager";
import {NativeEventEmitter, NativeModules, Platform} from "react-native";
import {BleError, Characteristic, Subscription} from "react-native-ble-plx";
import {DeviceStatus} from "../../models/Ble/DeviceStatus";
import {BleDevice} from "../../models/Ble/BleDevice";
import { stringToBytes } from "convert-string";
import {getServiceUUID} from "./BluetoothConstants";

export interface BLECommand {
    deviceId : string,
    data : string,
    serviceUUID :string,
    characteristicUUID : string
}
export interface AdapterPayload {
    type : string,
    data : {bleStatus?: string, deviceId?: string, name? :string, isConnected?: boolean}
}
export const  StreamingTypes = {
    ADAPTER_DATA : "ADAPTER_DATA",
    DEVICE_DATA : "DEVICE_DATA"
}
class BLEManager {

    private  BleManagerModule = NativeModules.BleManager;
    private bleManagerEmitter = new NativeEventEmitter(this.BleManagerModule);
    private emiter: any;
    private emiterScan : any;
    private adapterEmiter: any;
    private controlValue : number = 0
    private disconnectedDevices : Map = new Map<string, string>()
    private connetingDevices : Map = new Map<string, string>()
    private detachedDevices :Map = new Map<string, string>()
    private isScanning: boolean =  false;

    constructor() {
        this.bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.bleManagerEmitter.addListener('BleManagerDidUpdateState', this.handleBleState);
        this.bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectDevice);

        this.bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
        BleManager.start({ showAlert: false }).then(() => {
            // Success code
            console.log("Module initialized");
        });
        BleManager.checkState();
    }

    handleDisconnectDevice = (data) => {
        if(!this.disconnectedDevices.has(data.peripheral )){
            this.detachedDevices.set(data.peripheral, data.peripheral)
        }
        let deviceName = ''
        if(this.connetingDevices.has(data.peripheral)){
            deviceName = this.connetingDevices.get(data.peripheral)
        } else {
            deviceName = 'UnKnown'
        }
        let adapterPayload : AdapterPayload = {
            type : StreamingTypes.DEVICE_DATA,
            data : { deviceId: data.peripheral,name: deviceName, isConnected: false}
        }
        this.adapterEmiter({payload :adapterPayload})
    }

    isDisconnectedDeviceAvailable = (): boolean => {
       if(this.detachedDevices.size > 0) {
           return true
       }
    }



    handleBleState = (data) => {
        console.log(data + "state of the device ++++++++++++++++")
        if(this.adapterEmiter){
            let adapterPayload : AdapterPayload = {
                type : StreamingTypes.ADAPTER_DATA,
                data : {bleStatus : data.state}
            }
            this.adapterEmiter({payload :adapterPayload})
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
        this.isScanning = false
        BleManager.stopScan().then(() => {
            console.log("Scan stopped");
        });
        this.emiterScan = null
    };

    scanAndConnectDetachedDevices = async () => {
        this.isScanning = true
        this.scanForPeripherals(null)
        await this.timeout(5000)
        this.stopScanningForPeripherals()
        let bledevices : Peripheral[] =await  BleManager.getDiscoveredPeripherals()
        let connected: boolean = false
        let connectedDevice :any = '';
        if(bledevices.length > 0){
            console.log("found discoverd device s++++++++" + bledevices.length)
            console.log("detached device count++++++++" + this.detachedDevices.size)
            for(const item of this.detachedDevices.keys()){
                console.log(item + "item in the detached map++++++++++++++++++++++++")
            }
            for (let i = 0 ; i < bledevices.length; i++){
                let deviceDiscoverd : Peripheral = bledevices[i]

                console.log("device id in the for loop " + deviceDiscoverd.id)
                if(this.detachedDevices.has(deviceDiscoverd.id)){
                    console.log("found detached device id ++++++++" + deviceDiscoverd.name)
                    try {
                        let deviceName =  deviceDiscoverd.name? deviceDiscoverd.name : 'UnKnown'
                        await this.connectToPeripheral(deviceDiscoverd.id, deviceName)
                        connected = true
                        connectedDevice = {id : deviceDiscoverd.id, name : deviceDiscoverd.name}
                        break
                    } catch (e) {
                        continue
                    }

                }
            }
        }
        return {isconnected : connected ,  connectedDevice}
    }
     timeout = (ms) =>  {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    connectToPeripheral = async (identifier: string, name: string) => {
        if(this.disconnectedDevices.has(identifier)){
            this.disconnectedDevices.delete(identifier)
        }
        this.connetingDevices.set(identifier, name)
        console.log("blemanager id" + identifier+ "+++++++++++")
        await BleManager.connect(identifier)
        if(this.disconnectedDevices.has(identifier)){
            this.disconnectedDevices.delete(identifier)
        }
        if(this.detachedDevices.has(identifier)){
            this.detachedDevices.delete(identifier)
        }
        let deviceName = ''
        if(this.connetingDevices.has(identifier)){
            deviceName = this.connetingDevices.get(identifier)
        } else {
            deviceName = 'UnKnown'
        }

        let adapterPayload : AdapterPayload = {
            type : StreamingTypes.DEVICE_DATA,
            data : { deviceId: identifier, name: deviceName,isConnected: true}
        }

        await BleManager.retrieveServices(identifier, [getServiceUUID()])
        this.adapterEmiter({payload :adapterPayload})
    }

    disconnectFromPeripheral = async (identifier: string) => {

        await BleManager.disconnect(identifier)
            .then((t) => {
                if(this.detachedDevices.has(identifier)){
                    this.detachedDevices.delete(identifier)
                }
                this.disconnectedDevices.set(identifier, identifier)
                // let deviceName = ''
                // if(this.connetingDevices.has(identifier)){
                //     deviceName = this.connetingDevices.has(identifier)
                // } else {
                //     deviceName = 'UnKnown'
                // }
                // let adapterPayload : AdapterPayload = {
                //     type : StreamingTypes.DEVICE_DATA,
                //     data : { deviceId: identifier,name: deviceName, isConnected: false}
                // }
                // this.adapterEmiter({payload :adapterPayload})


            })
    }

    handleUpdateValueForCharacteristic = (data) => {
        if(this.emiter){
            this.controlValue += 1
            if(this.controlValue % 2 == 0){
                this.controlValue = 0
            } else {
                this.emiter(data.value)
            }
        }
    }


    writeCharacteristicWithResponse = async (command: BLECommand) => {
        console.log("get the commmand send req from ble manager device id +++++++++++++++++++++++" + command.deviceId)
        console.log("get the commmand send req from ble char +++++++++++++++++++++++" + command.characteristicUUID)
        console.log("get the commmand send req from ble service +++++++++++++++++++++++" + command.serviceUUID)
        console.log("get the commmand send req from ble data +++++++++++++++++++++++" + command.data)
        const dataSent = stringToBytes(command.data);
        console.log(dataSent[0] + "____________")

        await BleManager.writeWithoutResponse(
            command.deviceId,
            command.serviceUUID,
            command.characteristicUUID,
            dataSent
        ).then( () => console.log("send message to the device +=++++++++ble manager ++++++++++++++++++================================"))
            .catch(e => console.log(e))
        return true;
    }
    removeDeviceStatusStreamingdata = () => {
        this.emiter = null
    }

    enableNotifications = async (command : BLECommand) => {
        console.log("enable notifi id :" + command.characteristicUUID)
        console.log("enable notifi id :" + command.serviceUUID)
        console.log("enable notifi id :" + command.deviceId)
        // await BleManager.retrieveServices(command.deviceId, [command.serviceUUID])
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

    //add new device for the initial loading if available
    public addDetachedDevice = (deviceId :string) => {
        if(!this.disconnectedDevices.has(deviceId)){
            this.detachedDevices.set(deviceId)
        }
    }


}
const blemanager = new BLEManager()
export  default blemanager;

import React, {FC, useEffect, useState} from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {FrequencyTypes, Modes, TherapyConfiguration} from "./HomeTabs";
import {useDispatch, useSelector} from "react-redux";
import Command, {CommandType} from "../models/Ble/commands/Command";
import {RootState} from "../store/store";
import {sendCommand, sendCommandsArray} from "../store/bluetooth/actions";
import {BleDevice} from "../models/Ble/BleDevice";
import {DeviceStatus} from "../models/Ble/DeviceStatus";
import {SessionEventTypes, TherapySession} from "../store/session/session.types";

type StartWorkoutPageProps = {
    showConfigCB : () => void;
    therapyConfig : TherapyConfiguration
};
const ModeMap = {
    0 : "Graduated",
    1 : "Pulsated"
}

const FrequecyMap = {
    0 : "Low",
    2 : "High",
    1 : "Medium"
}

const StartWorkoutPage: FC<StartWorkoutPageProps> = (props) => {
    const dispatch = useDispatch();
    const connectedDevice = useSelector(
        (state: RootState) => state.bluetooth.connectedDevice,
    );
    const devicesStatus = useSelector(
        (state: RootState) => state.bluetooth.devicesStatus,
    );
    const timerValue = useSelector(
        (state: RootState) => state.bluetooth.timerValue,
    );

    const [timer, setTimer] = useState(0)
    const [deviceId, setDeviceId] =  useState("");
    const {therapyConfig, showConfigCB} = props
    const [showConfigDialog, setShowConfigDailog] = useState(false)
    const [pauseFLag, setPauseFLag ] = useState(0)
    const [deviceMode, setDeviceMode] = useState(therapyConfig.mode)
    const [deviceFrequency , setDeviceFrequency] = useState(therapyConfig.frequency)
    const startPauseDevice = () => {
        console.log("device id :+++++++++++++" + deviceId)
        if(pauseFLag == 1){
            let startCommand = new Command(deviceId,CommandType.START)
            let modeCommand = new Command(deviceId, CommandType.CHANGE_MODE_2)
            let frequencyCommand = new Command(deviceId, CommandType.CHANGE_INTENSITY_1)
            if(deviceFrequency == FrequencyTypes.LOW){
            } else if(deviceFrequency ==  FrequencyTypes.MEDIUM){
                frequencyCommand = new Command(deviceId, CommandType.CHANGE_INTENSITY_2)
            } else {
                frequencyCommand = new Command(deviceId, CommandType.CHANGE_INTENSITY_3)
            }
            if(therapyConfig.mode == Modes.GRADUATED){
                modeCommand = new Command(deviceId, CommandType.CHANGE_MODE_2)
            }else{
                modeCommand = new Command(deviceId, CommandType.CHANGE_MODE_1)
            }
            let commands: Command[] = new Array();
            commands.push(startCommand)
            commands.push(modeCommand)
            commands.push(frequencyCommand)

            dispatch(sendCommandsArray(commands, therapyConfig.time * 60, {mode : deviceMode, frequency : deviceFrequency}))
        } else {
            // send pause command
            dispatch(sendCommand(new Command(deviceId, CommandType.PAUSE)))
        }

    }

    useEffect(() => {
        if(deviceMode != therapyConfig.mode){
            setDeviceMode(therapyConfig.mode)
        }
        if(deviceFrequency != therapyConfig.frequency){
            setDeviceFrequency(therapyConfig.frequency)
        }
    }, [therapyConfig])

    useEffect(() => {
        if(connectedDevice == null || !connectedDevice){
            // goto start page
        }else {

            setDeviceId(connectedDevice.id)

        }
    }, [connectedDevice])

    const processData = (status : DeviceStatus) => {
        if(pauseFLag != status.pauseFlag){
            setPauseFLag(status.pauseFlag)
        }
        if(deviceMode != status.apWorkMode && status.pauseFlag == 0){
            setDeviceMode(status.apWorkMode)
        }
        if(deviceFrequency != status.intensityFlag && status.pauseFlag == 0){
            setDeviceFrequency(status.intensityFlag)
        }
    }

    const getTimeString = (timeSeconds : number) :string =>  {
        let minutes =  Math.floor(timeSeconds / 60)
        let minutesString = minutes.toString()
        if(minutes < 10) {
            minutesString = "0" + minutesString
        }
        let seconds = timeSeconds % 60
        let secondsString =  seconds;
        if(seconds < 10 ) {
            secondsString = "0" + secondsString
        }
        return minutesString + " : " + secondsString
    }

    useEffect(() => {
        let filteredDevice:(BleDevice | undefined) = devicesStatus.find((device : BleDevice)  => device.id == deviceId)
        if(filteredDevice){
            if(filteredDevice.status){
                // setDeviceState(filteredDevice.status)
                processData(filteredDevice.status)
                // console.log(filteredDevice.status)
            }

        }
    },[devicesStatus])

    useEffect(() => {
        setTimer(timerValue)
    }, [timerValue])

    return(
        <SafeAreaView >
            <KeyboardAvoidingView>
                {/*<ImageBackground*/}
                {/*    style={{*/}
                {/*        width: '100%',*/}
                {/*        height: '100%'*/}
                {/*    }}*/}
                {/*    source={require("../assets/images/home.jpg")}*/}
                {/*/>*/}
                <View
                style={{
                    display : "flex",
                    height: "100%",
                    width : "100%",
                    backgroundColor : "black"
                }}
                >
                    <View
                        style={{
                            display : "flex",
                            height : "100%",
                            width : "100%",
                            marginTop :  30
                        }}
                    >
                        <View style={{
                            flex :1,
                            alignItems : "center",
                        }}>
                            <Text style={{
                                marginTop : 10,
                                ...styles.fontLarge,
                                color:"white",
                                textAlign:"center"
                            }}>{pauseFLag == 1 ? "Start workout" : getTimeString(timer)} </Text>
                            <Text
                                style={{
                                    color : "rgba(255,255,255,0.5)",
                                    ...styles.fontNormal,
                                    marginTop : 10
                                }}
                            >{pauseFLag == 1 ? "Configure device" : "Workout in-progress"}</Text>

                        </View>
                        <View style={{
                            flex :3,
                            paddingVertical : 30

                        }}>
                            <ImageBackground
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                                source={require("../assets/images/home.jpg")}
                            />
                        </View>
                        <View style={{
                            flex :3,
                            marginHorizontal : 24,
                            justifyContent:"space-between",
                            marginBottom : 10

                        }}>
                            <View style={{
                                flex : 2,
                                flexDirection : "row",
                                justifyContent : "space-between",
                            }}>
                                <View style={{
                                    flexDirection : "column",
                                    flex : 1
                                }}>
                                    <Text
                                        style={{
                                            ...styles.fontLargeMedium,
                                            color:"white",
                                        }}
                                    >{FrequecyMap[deviceFrequency]}</Text>
                                    <Text
                                    style={{
                                        ...styles.fontMedium,
                                        color : "rgba(255,255,255,0.5)"
                                    }}>Frequency</Text>
                                </View>
                                <View style={{
                                    flexDirection : "column",
                                    flex : 1
                                }}>
                                    <Text
                                        style={{
                                            ...styles.fontLargeMedium,
                                            color:"white",
                                        }}
                                    >{therapyConfig.time}min</Text>
                                    <Text
                                        style={{
                                            ...styles.fontMedium,
                                        }}>Time</Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection : "column",
                                        flex : 1
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.fontLargeMedium,
                                            color:"white",
                                        }}
                                    >{ModeMap[deviceMode]}</Text>
                                    <Text
                                        style={{
                                            ...styles.fontMedium,
                                        }}>Mode </Text>
                                </View>

                            </View>

                            <View style={{
                                flex : 1,
                                justifyContent : "center",
                            }}>
                                <TouchableOpacity
                                    disabled={pauseFLag == 0}
                                    onPress={() => {showConfigCB()}}
                                    style={{
                                    paddingVertical: 10,
                                    paddingHorizontal : 20
                                }}>
                                    <Text style={{
                                        fontWeight:"100",
                                        color : "rgba(255,255,255,0.5)",
                                        ...styles.fontSmall,
                                        textAlign : "center",
                                        textDecorationLine : "underline"
                                    }}>Change configuration</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{
                                flex : 3,
                                justifyContent : "center"
                            }}>
                                <TouchableOpacity
                                    style={{
                                        width : "98%",
                                        backgroundColor : "#F23847",
                                        alignSelf : "center",
                                        paddingVertical : 20,
                                        borderRadius : 26
                                    }}
                                    onPress={() => {startPauseDevice()}}
                                >
                                    <Text
                                        style={{
                                            ...styles.fontMedium,
                                            color:"white",
                                            fontWeight : "bold",
                                            textAlign : "center"
                                        }}
                                    >{pauseFLag == 1 ? "Start" : "Pause"} </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    fontLarge: {
        fontFamily : "Poppins-Regular",
        fontSize: 24,
    },
    fontLargeMedium : {
        fontFamily : "Poppins-Regular",
        fontSize: 19,
    },
    fontMedium : {
        fontFamily : "Poppins-Regular",
        fontSize: 16,
    },
    fontSmall : {
        fontFamily : "Poppins-Regular",
        fontSize: 12,
    },
    fontNormal : {
        fontFamily : "Poppins-Regular",
        fontSize: 14,
    }
});
export default StartWorkoutPage;

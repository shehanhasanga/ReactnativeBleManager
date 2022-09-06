import React, {FC, useState} from "react";
import defaultTheme, {WithTheme} from "../theme/defaults";
import {useDispatch, useSelector} from "react-redux";
import {
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
    Dimensions,
    TouchableOpacityComponent,
    TouchableOpacity,
    TextInput,
    Platform,
    Alert,
    PermissionsAndroid,
    Modal,
    Pressable,
    Keyboard, StyleSheet
} from "react-native";
import {RootState} from "../store/store";
import BluetoothStateManager from "react-native-bluetooth-state-manager";
import {AdapterState} from "../services/bluetooth/BluetoothConstants";
import {startScanDevicesAction} from "../store/bluetooth/actions";
import Geolocation from 'react-native-geolocation-service';
import LoadingModal from "../components/modals/LoadingModal";
;


const GrantPermissionPage: FC= ({ theme,navigation}) => {
    const { width, height } = Dimensions.get('window');
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const devicesAdapterStatus = useSelector(
        (state: RootState) => state.bluetooth.adapterStatus,
    );
    const scandevice = async () => {
        if(Platform.OS === 'ios') {
            // dispatch(startScanDevicesAction());
        } else {
            const permission = await requestLocationPermission();
            if(permission){
                // dispatch(startScanDevicesAction());
                setShowLoadingModal(true);
                Geolocation.getCurrentPosition(
                    (position) => {
                        setShowLoadingModal(false);
                        navigation.navigate('Scandevice')
                    },
                    (error) => {
                        // See error code charts below.
                        // console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
                // showAlert("You can connect to device", "Location permissions are enabled")
            } else {
                showAlert("Please enable location permission in device settings", "Permisssion required")
            }
        }
    }

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location permission for bluetooth scanning',
                    message: 'Enable ocatio permissions',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };
    const showAlert = (message :string, title:string) => {
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    const openBluetoothSettings = () => {
        BluetoothStateManager.openSettings();
    };
    const [weightModalVisible, setweightModalVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(true);
    const updateWeightModal = () => {
        return(
            <View>

            </View>
        );

    }

    return(
        <>
            <SafeAreaView>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <View>
                            <View style={{
                                height : height,
                                width,
                                color : "white",
                                display : "flex",
                                flexDirection:"column",
                                padding : 20,
                                backgroundColor : "black"
                            }}>
                                <View
                                    style={{
                                        flex : 1,
                                        flexDirection:"column",

                                    }}
                                >
                                    <Text style={{
                                        fontSize : 24,
                                        fontWeight:"bold",
                                        color : "white",
                                        marginBottom : 20
                                    }}>Location</Text>

                                    <Text style={{
                                        color : "white",
                                        fontSize : 16
                                    }}>In order to connect to your spryng over Bluetooth, Android requires your device's location services to be on, and Spryng need permission to access it. </Text>
                                    <View style={{
                                        width:"100%",
                                        alignItems:"center"
                                    }}>
                                        <TouchableOpacity
                                            onPress={openBluetoothSettings}
                                            disabled={devicesAdapterStatus == AdapterState.PoweredOn}
                                            style={{
                                            width : width * 0.9,
                                            margin : 20,
                                            padding : 20,
                                            alignItems:"center",
                                            backgroundColor: devicesAdapterStatus == AdapterState.PoweredOn ? "gray" :"white",
                                            borderRadius : 30
                                        }}>
                                            <Text style={{
                                                color : "black",
                                                fontWeight : "bold"
                                            }}>{devicesAdapterStatus == AdapterState.PoweredOn ? "Bluetooth enabled" : "Enable bluetooth"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={scandevice}
                                            disabled={devicesAdapterStatus != AdapterState.PoweredOn}
                                            style={{
                                            width : width * 0.9,
                                            margin : 20,
                                            padding : 20,
                                            alignItems:"center",
                                            backgroundColor: devicesAdapterStatus != AdapterState.PoweredOn ? "gray" : "white",
                                            borderRadius : 30
                                        }}>
                                            <Text style={{
                                                color : "black",
                                                fontWeight : "bold"
                                            }}>Connect to Spryng</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/*<Text style={{*/}
                                    {/*    color : "white",*/}
                                    {/*    fontSize : 16*/}
                                    {/*}}> Please give Spryng permission to access your device's location. This is only used for Bluetooth pairing.*/}
                                    {/*</Text>*/}
                                    {/*<View style={{*/}
                                    {/*    width:"100%",*/}
                                    {/*    alignItems:"center"*/}
                                    {/*}}>*/}
                                    {/*    <TouchableOpacity style={{*/}
                                    {/*        width : width * 0.9,*/}
                                    {/*        margin : 20,*/}
                                    {/*        padding : 20,*/}
                                    {/*        alignItems:"center",*/}
                                    {/*        backgroundColor:"white",*/}
                                    {/*        borderRadius : 30*/}
                                    {/*    }}>*/}
                                    {/*        <Text style={{*/}
                                    {/*            color : "black",*/}
                                    {/*            fontWeight : "bold"*/}
                                    {/*        }}>Grant location access</Text>*/}
                                    {/*    </TouchableOpacity>*/}
                                    {/*</View>*/}
                                </View>

                            </View>
                            {showLoadingModal ?(<LoadingModal callback={() => {}} message={""}/>) : (<></>) }

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>

    );

}

const styles = StyleSheet.create({
    headerTxt : {
        fontSize : 24,
        color: "white"
    },
    formTxt : {
        fontSize:16,
        color:"white",
        fontWeight : "400"
    },
    centeredView: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        position : "absolute"
    },
    modalView: {
        margin: 20,
        backgroundColor: "#424242",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 5,

    }
})

export default GrantPermissionPage;

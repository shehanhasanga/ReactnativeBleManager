import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity, Alert, PermissionsAndroid,  Platform,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {initiateConnectionAction, startScanDevicesAction, stopScanAction} from "../store/bluetooth/actions";
import DeviceListItem from "../components/listItems/DeviceListItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BackHandler } from "react-native";

type ScanDeviceProps = {
  navigation : any;
};
const ScanDevice: FC<ScanDeviceProps> = props => {
  const connectedDevices = useSelector(
      (state: RootState) => state.bluetooth.connectedDeviceList,
  );
  const [connectingDeviceId, setConnectingDeviceId] = React.useState<string>('');
  function handleBackButtonClick() {
    goback();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  useEffect( () => {
      if(connectingDeviceId){
        if(connectingDeviceId != ''){
          const isDuplicate = connectedDevices.some(
              device => device.id === connectingDeviceId,
          );
          if(isDuplicate){
            stopScan();
            setScanning(false);
            setRefreshing(false);
            props.navigation.navigate('HomeTabsPage', {deviceId: connectingDeviceId});
          }
        }
      }
    // scandevice();
  }, [connectedDevices]);
  useEffect( () => {
    toggleScan()
  }, []);

  const goback = () => {
    stopScan();
    setScanning(false);
    setRefreshing(false);
    props.navigation.goBack();
  }

  const dispatch = useDispatch();
  const devices = useSelector(
      (state: RootState) => state.bluetooth.availableDevices,
  );
  const isConnected = useSelector(
      (state: RootState) => !!state.bluetooth.connectedDevice,
  );
  const isScanning = useSelector(
      (state: RootState) => state.bluetooth.isScanning,
  );
  const connectToPeripheral = (id: string, name : string) => {
    setConnectingDeviceId(id)

    dispatch(initiateConnectionAction(id, name));
  }

  const [refreshing, setRefreshing] = React.useState(false);
  const [isScanningDevices, setScanning] = useState<boolean>(isScanning);
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
  const toggleScan = () => {
    if(isScanning){
      stopScan();
      setScanning(false);
      setRefreshing(false);
    } else {
      scandevice();
      setScanning(true);
      setRefreshing(true);
    }
  }
  const stopScan = async () => {
    dispatch(stopScanAction());
  }

  const scandevice = async () => {
    if(Platform.OS === 'ios') {
      dispatch(startScanDevicesAction());
    } else {
      const permission = await requestLocationPermission();
      if(permission){
        dispatch(startScanDevicesAction());
      } else {
        showAlert("Please enable location permission in device settings", "Permisssion required")
      }
    }
  }

  const showAlert = (message :string, title:string) => {
    Alert.alert(
        title,
        message,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    scandevice();
    wait(15000).then(() => {
      setRefreshing(false)
      stopScan();
    });
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>

      <View style={{
        backgroundColor : "#000000",
        height : '100%',
        width  :'100%',
        display : 'flex',
        flexDirection : "column"
      }}
      >
        {/*<ScrollView style={{*/}
        {/*  flex : 1*/}
        {/*}}*/}
        {/*    refreshControl={*/}
        {/*      <RefreshControl*/}
        {/*          refreshing={refreshing}*/}
        {/*          onRefresh={onRefresh}*/}
        {/*      />*/}
        {/*    }*/}
        {/*>*/}

        {/*</ScrollView>*/}
        <View style={{
          width: "100%",
          marginTop : 20,
          padding : 10,
          alignItems : "center"
        }}>
          <Text style={{
            fontSize : 18,
            color : "white",
            fontWeight : "bold"
          }}>Select your spryng</Text>
          <Text style={{
            textAlign : "center",
            marginTop : 20,
            fontWeight : "normal",
            color : "#cacaca"
          }}>These are the Spryngs we forund. Please make sure to select the right Spryng.</Text>

          <View style={{
            width : "100%",
            padding :10,
            marginTop :  30,
            backgroundColor : "#222427",
            display : "flex",
            flexDirection : "row",
            justifyContent : "space-between",
            alignItems : "center"
          }}>
            <Text>Spryngs near you</Text>
            <Icon.Button name= {isScanning ?  "stop-circle" : "refresh"} color="white" size={24} backgroundColor = "#222427"  onPress = {() => {toggleScan()}} />
          </View>
        </View>
        {/*<View style={{*/}
        {/*  flex : 2,*/}
        {/*  paddingVertical : 20,*/}
        {/*  paddingHorizontal : 10,*/}
        {/*  display : "flex",*/}
        {/*  flexDirection : "row",*/}
        {/*  alignItems : "center",*/}
        {/*  justifyContent : "space-between"*/}
        {/*}}>*/}

        {/*  <Text style={{*/}
        {/*    fontWeight : "bold",*/}
        {/*    fontSize : 15,*/}
        {/*  }}>Scanned Devices : </Text>*/}
        {/*  <TouchableOpacity*/}
        {/*      onPress={() => toggleScan()}*/}
        {/*  >*/}
        {/*    <View style={{*/}
        {/*      paddingHorizontal : 15,*/}
        {/*      paddingVertical : 5,*/}
        {/*      backgroundColor : '#337e89',*/}
        {/*      borderRadius  : 10*/}

        {/*    }}>*/}
        {/*      {isScanning ? (*/}
        {/*          <Text>Stop Scan</Text>*/}
        {/*      ) : (*/}
        {/*          <Text>Start Scan</Text>*/}
        {/*      ) }*/}

        {/*    </View>*/}
        {/*  </TouchableOpacity>*/}


        {/*</View>*/}
        <View style={{
          flex : 30
        }}>
          <View style={{
            height :'100%'
          }}
          >
            <FlatList
                refreshing={refreshing}
                onRefresh={onRefresh}
                contentContainerStyle={{
                  marginHorizontal : 10
                }}
                data={devices}
                renderItem={({item}) => (
                    <DeviceListItem
                        device={item}
                        callback={(id, name) => {connectToPeripheral(id, name)}}
                    />
                )}

            />

          </View>
        </View>



      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionBarHost: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#353535',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
});

export default ScanDevice;

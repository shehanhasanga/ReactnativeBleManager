/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TouchableOpacity, TouchableOpacityComponent,
  View
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import CTAButton from './components/CTAButton';
import DeviceModal from './components/DeviceConnectionModal';
import {BluetoothPeripheral} from './models/BluetoothPeripheral';
import {
  initiateConnection,
  scanForPeripherals,
  startHeartRateScan,
} from './store/bluetooth/bluetooth.reducer';
import {RootState, store} from './store/store';
import {FC} from 'react';
import Blemanage from "./modules/Bluetooth/Blemanage";
import ConnectedDeviceList from "./components/ConnectedDeviceList";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import ScanDevice from "./pages/ScanDevice";
import HomeView from "./pages/HomeView";
import TextModal from "./components/modals/InfoModal";
import InfoModal from "./components/modals/InfoModal";
import {getAdapterStatus, startTimerAction} from "./store/bluetooth/actions";
import DeviceView from "./pages/DeviceView";
import Newble from "./pages/Newble";
import StartTherapyView from "./pages/StartTherapy";
import LoginView from "./pages/LoginView";
import StartView from "./pages/StartView";
import LoginPage from "./pages/LoginPage";
import PersonalDataPage from "./pages/PersonalDataPage";
import TermsPage from "./pages/TermsPage";
import StartSetupPage from "./pages/StartSetupPage";
import GrantPermissionPage from "./pages/GrantPermission";
import HomeTabsPage from "./pages/HomeTabs";
import UserImportantThingsPage from "./pages/UserImportantThingsPage";
import ChartView from "./pages/ChartView";
import HomeDrawerPage from "./pages/HomeDrawer";
import WelcomePage from "./pages/WelcomePage";
import SignInStartPage from "./pages/SignInStartScreen";
import SignInPage from "./pages/SignInScreen";
import OnboardingQuestionsScreen from "./pages/OnboardingQuestionScreen";
import DropDownPage from "./pages/DropDownFile";
// import DrawerPage from "./pages/DrawerPage";
// import {Device} from "react-native-ble-plx";

const App: FC = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const Home: FC = () => {
  useEffect( () => {
      getBleStatus()
      dispatch(startTimerAction(200, true))
  }, []);


    const getBleStatus = () => {
        dispatch(getAdapterStatus())
    }
  const dispatch = useDispatch();

  const devices = useSelector(
    (state: RootState) => state.bluetooth.availableDevices,
  );

  const connecteDevices : Array<BluetoothPeripheral> = useSelector(
      (state: RootState) => state.bluetooth.connectedDeviceList,
  );


  const Stack = createStackNavigator();
  function scanAndConnect() {
    blemanager?.scanAndConnect();
  }

  const [blemanager, setblemanager] = useState<Blemanage>();
  const [demodevices, setdemodevices] = useState<Array<BluetoothPeripheral>>( []);
  // const scandevice = () => {
  //   blemanager?.scanAndConnect();
  // };

  const heartRate = useSelector(
    (state: RootState) => state.bluetooth.heartRate,
  );


  const showAlert = (message :string, title:string) => {
    Alert.alert(
        title,
        message,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
  }

  // const permissionCheck = () => {
  //   PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then(response => {
  //     if (response === true){
  //       //Open scanner
  //     }
  //     else if (response === false){
  //       showAlert("Please enable location permission in device settings", "Permisssion required")
  //     }
  //   })
  //   }
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission for bluetooth scanning',
            message: 'wahtever',
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

  const isConnected = useSelector(
    (state: RootState) => !!state.bluetooth.connectedDevice,
  );

  const scandevice = async () => {
    const permission = await requestLocationPermission();
    if(permission){
      dispatch(scanForPeripherals());
    } else {
      showAlert("Please enable location permission in device settings", "Permisssion required")
    }
  }

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const closeModal = () => setIsModalVisible(false);

  const connectToPeripheral = (device: BluetoothPeripheral) =>
    dispatch(initiateConnection(device.id));
  const renderDeviceModalListItem = (item: ListRenderItemInfo<BluetoothPeripheral>) => {
    return (
        <Text>{item.item.name}</Text>
    )
  }

  return (

      <NavigationContainer>
        <Stack.Navigator>
            {/*<Stack.Screen component={StartTherapyView} name={'StartTherapyView'} options={{headerStyle:{*/}
            {/*        backgroundColor : '#353535'*/}
            {/*    }, headerTintColor: '#fff'}  }/>*/}
            {/*<Stack.Screen component={DrawerPage} name={'DrawerPage'} options={{headerShown : false}}/>*/}
            {/*<Stack.Screen component={ChartView} name={'ChartView'} options={{headerShown : false}}/>*/}
            {/*<Stack.Screen component={HomeDrawerPage} name={'HomeDrawerPage'} options={{headerShown : false}}/>*/}
            {/*<Stack.Screen component={DropDownPage} name={'DropDownPage'} options={{headerShown : false}}/>*/}
            <Stack.Screen component={WelcomePage} name={'WelcomePage'} options={{headerShown : false}}/>
            <Stack.Screen component={HomeTabsPage} name={'HomeTabsPage'} options={{headerShown : false}}/>
            <Stack.Screen component={SignInStartPage} name={'SignInStartPage'} options={{headerShown : false}}/>

            <Stack.Screen component={SignInPage} name={'SignInPage'} options={{headerShown : false}}/>

            <Stack.Screen component={OnboardingQuestionsScreen} name={'OnboardingQuestionsScreen'} options={{headerShown : false}}/>
            <Stack.Screen component={StartView} name={'StartView'} options={{headerShown : false}}/>
            <Stack.Screen component={UserImportantThingsPage} name={'UserImportantThingsPage'} options={{headerShown : false}}/>

            <Stack.Screen component={LoginPage} name={'LoginPage'} options={{headerShown : false}}/>
            <Stack.Screen component={PersonalDataPage} name={'PersonalDataPage'} options={{headerShown : false}}/>
            <Stack.Screen component={GrantPermissionPage} name={'GrantPermissionPage'} options={{headerShown : false}}/>
            <Stack.Screen component={ScanDevice} name={'Scandevice'} options={{headerStyle:{
                    backgroundColor : '#353535',
                }, headerTintColor: '#fff', headerShown : false}  }/>
            {/*<Stack.Screen component={HomeTabsPage} name={'HomeTabsPage'} options={{headerShown : false}}/>*/}
            <Stack.Screen component={StartSetupPage} name={'StartSetupPage'} options={{headerShown : false}}/>
            <Stack.Screen component={TermsPage} name={'TermsPage'} options={{headerShown : false}}/>



            <Stack.Screen component={LoginView} name={'Newble'} options={{headerStyle:{
                    backgroundColor : '#353535'
                }, headerTintColor: '#fff'}  }/>

          <Stack.Screen component={HomeView} name={"Main"} options={{headerShown : false}}/>
            <Stack.Screen component={StartTherapyView} name={'StartTherapyView'} options={{headerStyle:{
                    backgroundColor : '#353535'
                }, headerTintColor: '#fff'}  }/>

            <Stack.Screen component={DeviceView} name={"DeviceView"} options={{headerStyle:{
                    backgroundColor : '#353535'
                }, headerTintColor: '#fff'}  }  />

        </Stack.Navigator>
      </NavigationContainer>

  );
};






const SecondView = ({}) =>{
  return (
      <SafeAreaView style={{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor :"#FFFFFF"
      }}>
        <Text>Second View</Text>
      </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#337e89',
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartRateTitleText: {
    display: 'flex',
    width: 100,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  back : {
   display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal :10,
    paddingVertical : 10,
    height: 200,
    backgroundColor: '#ff0000',
    width : '100%'
  },
  modalFlatlistContiner: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default App;

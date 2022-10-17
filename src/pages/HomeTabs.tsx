import React, {FC, useCallback, useRef, useState} from "react";
import defaultTheme, {WithTheme} from "../theme/defaults";
import {useDispatch} from "react-redux";
import {
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
    Dimensions,
    TouchableOpacityComponent, TouchableOpacity, TextInput, Animated, Easing, StyleSheet
} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeView from "./HomeView";
import LoginPage from "./LoginPage";
import PersonalDataPage from "./PersonalDataPage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceView from "./DeviceView";
import StartTherapyView from "./StartTherapy";
import SignInStartPage from "./SignInStartScreen";
import SignInPage from "./SignInScreen";
import TabIconSvg from "../components/svgs/TabIcon";
import StartWorkoutPage from "./StartWorkoutScreen";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import DropDownPicker from 'react-native-dropdown-picker';
import {TherapyConfig} from "../store/session/session.types";
import TherapyConfigDialog from "../components/listItems/TherapyConfigDialog";
;
enum Tabs {
    DASHBOARD = 'Dashboard',
    ADD = "Add",
    PROFILE = "Profile"
}

const HomeTabsPage: FC= ({ route, navigation  }) => {
    // const { deviceId } = route.params;
  const Tab = createBottomTabNavigator();
    const { width, height } = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    const availableHeight = height - (insets.bottom + insets.top);
  const [showConfigDialog, setShowConfigDailog] = useState(false);
  const [currentTab , setCurrentTab] = useState(Tabs.ADD);
    const [openFrequency, setOpenFrequency] = useState(false);
    const [frequency, setFrequency] = useState(1);
    const [frequencyItems, setFrequencyItems] = useState([
        {label: 'Low', value: 1},
        {label: 'Medium', value: 2},
        {label: 'High', value: 3}
    ]);

    const [openMode, setOpenMode] = useState(false);
    const [value2, setValue2] = useState(1);
    const [items2, setItems2] = useState([
        {label: 'Graduated', value: 1},
        {label: 'Pulsated', value: 2}
    ]);

    let therapyConfigData : TherapyConfig = {
        pattern : 2,
        itensity : 1,
        time : 10
    }
     const [therapyConfig, setTherapyConfig] = useState<TherapyConfig>(therapyConfigData)

  const showConfig = () => {
      setShowConfigDailog(true)
      // handleAnimation();
  }


    const onFrequencyOpen = useCallback(() => {
        setOpenMode(false);
    }, []);

    const onModeOpen = useCallback(() => {
        setOpenFrequency(false);;
    }, []);
    const animation = useRef(new Animated.Value(0));
    const updateConfigs = (therapyConfignew : TherapyConfig) => {
        console.log(therapyConfignew)
        setTherapyConfig(therapyConfignew)
        setShowConfigDailog(false)
    }
    const closeConfigDialog = () => {
        console.log("closing dialog")
        Animated.timing(animation.current, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start( () => {
            console.log("closed the dialog")
            setShowConfigDailog(false)
        });

    }
    const handleAnimation = () => {
        Animated.spring(animation.current, {
            toValue: -(availableHeight / 1.8),
            duration: 3000,
            useNativeDriver: true,
        }).start();
        console.log(animation.current)
    };
    const SelectItem:FC = () => {
        return (

            <View style={{
                marginTop: 10,
                width : "100%",
                paddingHorizontal : 10,
                flexDirection : "row",
                alignItems : "center",
                position:'relative'
            }}>
                <Text style={{
                    ...styles.fontMedium,
                    color : "#979797",
                    flex :1,

                }}>Freequency</Text>
                <View style={{
                    flex: 2,
                    height : "100%",
                }}>
                    <TouchableOpacity style={{
                        flex :1,
                        paddingHorizontal : 20,
                        justifyContent : "center"
                    }}>
                        <DropDownPicker
                            zIndex={100000}
                            zIndexInverse={1000}

                            open={openFrequency}
                            value={frequency}
                            items={frequencyItems}
                            setOpen={setOpenFrequency}
                            setValue={setFrequency}
                            setItems={setFrequencyItems}
                        />
                    </TouchableOpacity>
                </View>

            </View>


        )
    }

    return(
        <SafeAreaView>
            {showConfigDialog &&
                <TherapyConfigDialog therapyConfig={therapyConfig} callback={(therapyConfig) => {updateConfigs(therapyConfig)}}/>
            }
            <View style={{
                width : "100%",
                height : "100%",
                display : "flex",
                justifyContent : "flex-end",
                backgroundColor : "black"
            }}>
                <View style={{
                    flex : 1,
                    backgroundColor : "blue"
                }}>
                    {currentTab == Tabs.DASHBOARD && <StartWorkoutPage showConfigCB={showConfig} />}
                    {currentTab == Tabs.ADD && <SignInStartPage />}
                    {currentTab == Tabs.PROFILE && <SignInPage />}

                </View>

            <View style={{
                top : 0,
                height : 110,
                width : "100%",
                backgroundColor : "#232323",
                flexDirection : "row",
                justifyContent : "space-between",
                alignItems : "center"
            }}>
                <TouchableOpacity
                    onPress={() => {setCurrentTab(Tabs.DASHBOARD)}}
                    style={{
                    padding : 20,
                    borderRadius : 10
                }}>
                    <MaterialCommunityIcons name="square" color={currentTab == Tabs.DASHBOARD ? "red" : "#A9A9A9"} size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {setCurrentTab(Tabs.ADD)}}
                    style={{
                    padding : 20,
                    borderRadius : 10
                }}>
                    <TabIconSvg/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    padding : 20,
                    borderRadius : 10
                }}
                onPress={() => {setCurrentTab(Tabs.PROFILE)}}
                >
                    <MaterialCommunityIcons name="account" color={currentTab == Tabs.PROFILE ? "red" : "#A9A9A9"} size={30} />
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>

        // <Tab.Navigator
        //     screenOptions={{
        //         tabBarActiveTintColor: '#F23847',
        //         headerShown : false,
        //         tabBarShowLabel: false,
        //     tabBarStyle:{
        //         backgroundColor:'#232323',
        //         height : 110,
        //         borderTopColor :"black",
        //         alignItems : "center"
        //     },
        // }}  >
        //     <Tab.Screen name="Home"
        //                 component={SignInStartPage}
        //                 options={{
        //         tabBarLabel: 'Home',
        //         tabBarIcon: ({ color, size }) => (
        //             <MaterialCommunityIcons name="square" color={color} size={30} />
        //         ),
        //
        //     }}
        //     />
        //     <Tab.Screen name="Workouts"
        //                 component={StartWorkoutPage}
        //                 options={{
        //                     tabBarLabel: 'Home',
        //                     tabBarIcon: ({ color, size }) => (
        //                         <TabIconSvg/>
        //                     ),
        //
        //                 }}
        //     />
        //     <Tab.Screen name="Settings"
        //
        //                 component={SignInPage}
        //                 options={{
        //                     tabBarLabel: 'Activities',
        //                     tabBarIcon: ({ color, size }) => (
        //                         <MaterialCommunityIcons name="account" color={color} size={size} />
        //                     ),
        //                 }}
        //     />
        // </Tab.Navigator>

    );

}
const styles = StyleSheet.create({
    configDialogInput : {
        flex :1,
        marginBottom:15,
        backgroundColor : "#232323",
        borderRadius : 20
    },

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
export default HomeTabsPage;

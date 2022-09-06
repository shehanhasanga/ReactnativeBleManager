import React, {FC} from "react";
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
    TouchableOpacityComponent, TouchableOpacity, TextInput
} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeView from "./HomeView";
import LoginPage from "./LoginPage";
import PersonalDataPage from "./PersonalDataPage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceView from "./DeviceView";

;


const HomeTabsPage: FC= ({ route, navigation }) => {
    const { deviceId } = route.params;
  const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator

            screenOptions={{
                tabBarActiveTintColor: '#b2f2bb',
                headerShown : false,
            tabBarStyle:{
                backgroundColor:'#000000',
                height:70,
                borderTopColor :"black"
            },
        }}  >
            <Tab.Screen name="Home"
                        initialParams={{ deviceId: deviceId }}
                        component={DeviceView}
                        options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),

            }}
            />
            <Tab.Screen name="Settings" component={PersonalDataPage}
                        options={{
                            tabBarLabel: 'Activities',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="playlist-check" color={color} size={size} />
                            ),
                        }}
            />
        </Tab.Navigator>

    );

}

export default HomeTabsPage;

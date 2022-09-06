// import React, {FC} from "react";
// import defaultTheme, {WithTheme} from "../theme/defaults";
// import {useDispatch} from "react-redux";
// import {
//     Image,
//     KeyboardAvoidingView,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     Text,
//     View,
//     Dimensions,
//     TouchableOpacityComponent, TouchableOpacity, TextInput
// } from "react-native";
// import {createDrawerNavigator} from "@react-navigation/drawer";
// import {NavigationContainer} from "@react-navigation/native";
// import HomeTabsPage from "./HomeTabs";
// import LoginPage from "./LoginPage";
// ;
//
//
// const DrawerPage: FC= ({ theme,navigation}) => {
//     const { width, height } = Dimensions.get('window');
//     const Drawer = createDrawerNavigator();
//
//     return(
//         <NavigationContainer>
//             <Drawer.Navigator initialRouteName="Home">
//                 <Drawer.Screen name="Home" component={HomeTabsPage} />
//                 <Drawer.Screen name="Notifications" component={LoginPage} />
//             </Drawer.Navigator>
//         </NavigationContainer>
//
//     );
//
// }
//
// export default DrawerPage;

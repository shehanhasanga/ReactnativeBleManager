import React, {FC, useEffect} from "react";
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
    ImageBackground,
    TouchableOpacityComponent, TouchableOpacity, TextInput
} from "react-native";
import {RootState} from "../store/store";


const WelcomePage: FC= ({ theme,navigation}) => {
    const connectedDevices = useSelector(
        (state: RootState) => state.bluetooth.connectedDeviceList,
    );
    useEffect( () => {
        if(connectedDevices.length > 0) {
            navigation.reset({
                index: 0,
                routes: [{name: 'SignInStartPage'}],
            });
        }

    }, [connectedDevices])
    const navigateToGrantPermission = () => {
        navigation.navigate('GrantPermissionPage')
    }
    const { width, height } = Dimensions.get('window');
    return(
        <>
            {/*<StatusBar translucent backgroundColor="transparent" />*/}

                <SafeAreaView >
                <KeyboardAvoidingView >
                    {/*<ScrollView >*/}
                        {/*<View>*/}
                    <ImageBackground
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        source={require("../assets/images/welcome.jpg")}
                    />
                            <View style={{
                                height : "100%",
                                width : "100%",
                                position : "absolute",
                                color : "white",
                                display : "flex",
                                flexDirection:"column",
                                paddingHorizontal : 20,
                                paddingBottom : 20
                            }}>
                                <View
                                    style={{
                                        flex : 2,
                                        flexDirection:"column",
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }}
                                >
                                    <Text style={{
                                        fontSize : 27,
                                        color:"white"
                                    }}>Welcome</Text>
                                    <Text style={{
                                        textAlign:"center",
                                        color : "white",
                                        marginTop: 15,
                                        fontSize : 16,
                                        lineHeight : 24,
                                        width : "95%"
                                    }}>SPRYNG ??? is an affordable, untethered,
                                        pneumatic compression wrap muscle
                                        recovery tool that helps improve circulation,
                                        athletic performance, and so much more.
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flex : 3,
                                        flexDirection:"column",
                                        justifyContent:"flex-end",
                                        alignItems:"center",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={navigateToGrantPermission}
                                        style={{
                                        width : width * 0.85,
                                        padding : 20,
                                        alignItems:"center",
                                        backgroundColor:"#FE3200",
                                        borderRadius : 30
                                    }}>
                                        <Text style={{
                                            color : "white",
                                            fontWeight : "bold",
                                            fontSize : 18
                                        }}>Start</Text>
                                    </TouchableOpacity>
                                    {/*<TouchableOpacity style={{*/}
                                    {/*    width : width * 0.7,*/}
                                    {/*    marginTop : 10,*/}
                                    {/*    alignItems:"center"*/}
                                    {/*}}>*/}
                                    {/*    <Text style={{*/}
                                    {/*        fontWeight:"bold",*/}
                                    {/*        fontSize : 18,*/}
                                    {/*        color : "white"*/}
                                    {/*    }}>Start</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                </View>
                            </View>
                        {/*</View>*/}
                    {/*</ScrollView>*/}
                </KeyboardAvoidingView>
                </SafeAreaView>

        </>

    );

}

export default WelcomePage;

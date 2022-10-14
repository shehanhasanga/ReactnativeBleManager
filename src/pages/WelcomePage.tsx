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
    ImageBackground,
    TouchableOpacityComponent, TouchableOpacity, TextInput
} from "react-native";


const WelcomePage: FC= ({ theme,navigation}) => {

    const navigateToGrantPermission = () => {
        navigation.navigate('GrantPermissionPage')
    }
    const { width, height } = Dimensions.get('window');
    return(
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground
                style={{
                    width: '100%',
                    height: '100%',
                    flex: 1
                }}
                source={require("../assets/images/welcome.jpg")}
            />
                <SafeAreaView style={{
                    height : height,
                    width,
                    color : "white",
                    position : "absolute",
                }}>
                <KeyboardAvoidingView >
                    <ScrollView >
                        {/*<View>*/}
                            <View style={{
                                height : height,
                                width,
                                color : "white",
                                display : "flex",
                                flexDirection:"column",
                                paddingHorizontal : 20,

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
                                    }}>SPRYNG ™ is an affordable, untethered,
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
                    </ScrollView>
                </KeyboardAvoidingView>
                </SafeAreaView>

        </>

    );

}

export default WelcomePage;

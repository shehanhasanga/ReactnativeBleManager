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
;


const StartSetupPage: FC= ({ theme,navigation}) => {
    const { width, height } = Dimensions.get('window');
    return(
        <>
            <SafeAreaView>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <View>
                            <Image
                                style={{
                                    height : height,
                                    width,
                                }}
                                source={require("../assets/images/scandevice.jpg")}
                            />
                            <View style={{
                                height : height,
                                width,
                                color : "white",
                                position : "absolute",
                                display : "flex",
                                flexDirection:"column",
                                padding : 20
                            }}>
                                <View
                                    style={{
                                        flex : 1,
                                        flexDirection:"column",
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }}
                                >
                                    <Text style={{
                                        fontSize : 24,
                                        fontWeight:"bold",
                                        color:"white"
                                    }}>Connect to your Spryng</Text>
                                    <Text style={{
                                        textAlign:"center",
                                        marginTop: 20,
                                        fontSize : 16,
                                    }}>Connect to Spryng to charger and continue to next step.Please make sure that Bluetooth is enabled on your phone</Text>
                                </View>

                                <View
                                    style={{
                                        flex : 2,
                                        flexDirection:"column",
                                        justifyContent:"flex-end",
                                        alignItems:"center"
                                    }}
                                >
                                    <TouchableOpacity style={{
                                        width : width * 0.8,
                                        margin : 20,
                                        padding : 20,
                                        alignItems:"center",
                                        backgroundColor:"white",
                                        borderRadius : 30
                                    }}>
                                        <Text style={{
                                            color : "black",
                                            fontWeight : "bold"
                                        }}>Set up Spryng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width : width * 0.7,
                                        marginTop : 10,
                                        alignItems:"center"
                                    }}>
                                        <Text style={{
                                            fontWeight:"bold"
                                        }}>No Spryng yet?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>

    );

}

export default StartSetupPage;

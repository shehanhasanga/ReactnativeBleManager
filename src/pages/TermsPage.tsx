import React, {FC, useState} from "react";
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
    TouchableOpacityComponent, TouchableOpacity, TextInput, Switch
} from "react-native";
;


const TermsPage: FC= ({ theme,navigation}) => {
    const { width, height } = Dimensions.get('window');
    const [isEnabled, setIsEnabled] = useState(false);

    const  policyItem = (msg:String, policyItem: number) => {
        return (
            <View>
                <View style={{
                    marginHorizontal :20,
                    display : "flex",
                    flexDirection : "row",
                    marginTop : 20,
                    marginBottom : 20
                }}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <View
                        style={{

                        }}
                    >
                        <Text style={{
                            marginRight : 10,
                            padding: 10,
                            textAlign:"justify"
                        }}>{msg}</Text>
                    </View>

                </View>

                <View
                    style={{

                        height :0.3,
                        backgroundColor : "white",
                        opacity : 0.4,
                    }}
                ></View>
            </View>
        );
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
                                source={require("../assets/images/loginimage.jpg")}
                            />
                            <View style={{
                                height : height,
                                width,
                                color : "white",
                                position : "absolute",
                                display : "flex",
                                flexDirection:"column",
                            }}>
                                <View
                                    style={{
                                        flex : 1,

                                        flexDirection:"column",
                                        justifyContent:"space-between",
                                        borderColor : "none",
                                    }}
                                >
                                    <View style={{
                                        padding : 20,
                                        height : "100%",
                                        justifyContent : "center"
                                    }}>
                                        <Text style={{
                                            fontSize : 22,
                                            color : "white",
                                            marginBottom : 20
                                        }}>Terms of Use and privacy policy</Text>
                                        <View style={{
                                            display : "flex",
                                        }}>
                                            <Text style={{
                                                fontSize : 15,
                                                color : "white",
                                                textAlign : "justify"
                                            }}>At Spryng we are commited to respecting your privacy and personal data. By signing up, you agree to use our
                                                <Text style={{

                                                    color : "blue",

                                                }}> Terms of Use</Text>
                                                <Text style={{

                                                    color : "white"
                                                }}> and</Text>
                                                <Text style={{

                                                    color : "blue"
                                                }}> Privacy Policy</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            height :0.3,
                                            backgroundColor : "white",
                                            opacity : 0.4,
                                        }}
                                    ></View>
                                </View>
                                <View
                                    style={{
                                        flex : 1,
                                        flexDirection:"column",
                                        justifyContent : "flex-start",


                                    }}
                                >

                                    {policyItem("I understand and accept that Spryng may process data that is classified as health data under certain data protection laws.", 1)}
                                    {policyItem("Keep me updated about Oura news, usage tips and offers. You may unsubscribe at any time.", 2)}



                                </View>
                                <View
                                    style={{
                                        flex : 1,
                                        flexDirection:"column",
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
                                        }}>I've read and accept the terms</Text>
                                    </TouchableOpacity>
                                    {/*<TouchableOpacity style={{*/}
                                    {/*    width : width * 0.7,*/}
                                    {/*    marginTop : 10,*/}
                                    {/*    alignItems:"center"*/}
                                    {/*}}>*/}
                                    {/*    <Text style={{*/}
                                    {/*        fontWeight:"bold"*/}
                                    {/*    }}>Forgot your password?</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>

    );

}

export default TermsPage;

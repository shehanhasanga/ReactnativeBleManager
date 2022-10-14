import React, {FC} from "react";
import {ImageBackground, SafeAreaView, View, Text, TouchableOpacityComponent, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignInStartPage: FC= ({ theme,navigation}) => {

    return(
        <SafeAreaView style={{
            height : "100%"
        }}>
            <ImageBackground
                style={{
                    width: '100%',
                    height: '100%',
                    flex: 1
                }}
                source={require("../assets/images/signin.jpg")}
            />
            <View
            style={{
                position:"absolute",
                display : "flex",
                height: "100%",
                width : "100%"
            }}
            >
                <View style={{
                    width : "100%",
                    padding :10,
                    marginTop :  30,
                    display : "flex",
                    flexDirection : "row",
                    justifyContent : "space-between",
                    alignItems : "center"
                }}>
                    <Icon.Button name="arrow-left" color="#4C4C4C" size={24} backgroundColor = "#000"  onPress = {() => {}} />
                </View>
                <View
                    style={{
                        display : "flex",
                        height : "100%",
                        width : "100%"
                    }}
                >
                    <View style={{
                        flex :1,
                        alignItems : "center",
                    }}>
                        <Text style={{
                            marginTop : 10,
                            fontSize : 26,
                            color:"white",
                            textAlign:"center"
                        }}>Connect</Text>
                        <Text
                            style={{

                                color : "rgba(255,255,255,0.5)",
                                fontSize : 15,
                                marginTop : 10
                            }}
                        >Your SPRING is ready</Text>

                    </View>
                    <View style={{
                        flex :4

                    }}>
                    </View>
                    <View style={{
                        flex :3,
                        marginHorizontal : 24,
                        justifyContent:"space-between",
                        marginBottom : 10

                    }}>
                        <Text
                            style={{
                                flex : 1,
                                fontSize : 26,
                                color:"white",
                            }}
                        >Lets Get Started</Text>
                        <View style={{
                            flex : 1,
                            justifyContent : "flex-end"
                        }}>
                            <Text style={{
                                fontWeight:"100",
                                color : "rgba(255,255,255,0.5)",
                                fontFamily : "Poppins-Regular"
                            }}>Do you have a SPRING Account ?</Text>
                        </View>

                        <View style={{
                            flex : 3,
                            justifyContent : "center"
                        }}>
                            <TouchableOpacity
                                style={{
                                    width : "98%",
                                    backgroundColor : "#F23847",
                                    alignSelf : "center",
                                    paddingVertical : 20,
                                    borderRadius : 26
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize : 16,
                                        color:"white",
                                        fontWeight : "bold",
                                        textAlign : "center"
                                    }}
                                >Sign In </Text>
                            </TouchableOpacity>
                        </View>

                        <Text
                            style={{
                                flex : 3,
                                fontSize : 12,
                                color:"rgba(255, 255,255,0.5)",
                                fontFamily : "Poppins-Regular",
                                lineHeight : 30,
                                textAlign : "center",
                                textDecorationLine : "underline"
                            }}
                        >Continue without Sign In</Text>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignInStartPage;

import React, {FC, useState} from "react";
import {
    ImageBackground,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet, KeyboardAvoidingView
} from "react-native";
import {TherapyConfig} from "../store/session/session.types";
type StartWorkoutPageProps = {
    showConfigCB : () => void;
    therapyConfig : TherapyConfig
};
const StartWorkoutPage: FC<StartWorkoutPageProps> = (props) => {
    const [showConfigDialog, setShowConfigDailog] = useState(false)


    return(
        <SafeAreaView >
            <KeyboardAvoidingView>
                {/*<ImageBackground*/}
                {/*    style={{*/}
                {/*        width: '100%',*/}
                {/*        height: '100%'*/}
                {/*    }}*/}
                {/*    source={require("../assets/images/home.jpg")}*/}
                {/*/>*/}
                <View
                style={{
                    display : "flex",
                    height: "100%",
                    width : "100%",
                    backgroundColor : "black"
                }}
                >
                    <View
                        style={{
                            display : "flex",
                            height : "100%",
                            width : "100%",
                            marginTop :  30
                        }}
                    >
                        <View style={{
                            flex :1,
                            alignItems : "center",
                        }}>
                            <Text style={{
                                marginTop : 10,
                                ...styles.fontLarge,
                                color:"white",
                                textAlign:"center"
                            }}>Start workout</Text>
                            <Text
                                style={{
                                    color : "rgba(255,255,255,0.5)",
                                    ...styles.fontNormal,
                                    marginTop : 10
                                }}
                            >Configure device</Text>

                        </View>
                        <View style={{
                            flex :3,
                            paddingVertical : 30

                        }}>
                            <ImageBackground
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                                source={require("../assets/images/home.jpg")}
                            />
                        </View>
                        <View style={{
                            flex :3,
                            marginHorizontal : 24,
                            justifyContent:"space-between",
                            marginBottom : 10

                        }}>
                            <View style={{
                                flex : 2,
                                flexDirection : "row",
                                justifyContent : "space-between",
                            }}>
                                <View style={{
                                    flexDirection : "column",
                                    flex : 1
                                }}>
                                    <Text
                                        style={{
                                            ...styles.fontLargeMedium,
                                            color:"white",
                                        }}
                                    >Low</Text>
                                    <Text
                                    style={{
                                        ...styles.fontMedium,
                                    }}>Frequency</Text>
                                </View>
                                <View style={{
                                    flexDirection : "column",
                                    flex : 1
                                }}>
                                    <Text
                                        style={{
                                            ...styles.fontLargeMedium,
                                            color:"white",
                                        }}
                                    >10min</Text>
                                    <Text
                                        style={{
                                            ...styles.fontMedium,
                                        }}>Time</Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection : "column",
                                        flex : 1
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.fontLargeMedium,
                                            color:"white",
                                        }}
                                    >Graduated</Text>
                                    <Text
                                        style={{
                                            ...styles.fontMedium,
                                        }}>Mode </Text>
                                </View>

                            </View>

                            <View style={{
                                flex : 1,
                                justifyContent : "center",
                            }}>
                                <Text style={{
                                    fontWeight:"100",
                                    color : "rgba(255,255,255,0.5)",
                                    ...styles.fontSmall,
                                    textAlign : "center",
                                    textDecorationLine : "underline"
                                }}>Change configuration</Text>
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
                                    onPress={() => {props.showConfigCB()}}
                                >
                                    <Text
                                        style={{
                                            ...styles.fontMedium,
                                            color:"white",
                                            fontWeight : "bold",
                                            textAlign : "center"
                                        }}
                                    >Start </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
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
export default StartWorkoutPage;

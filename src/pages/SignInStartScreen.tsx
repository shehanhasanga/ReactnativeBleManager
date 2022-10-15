import React, {FC} from "react";
import {
    ImageBackground,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

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
                        }}>Connect</Text>
                        <Text
                            style={{
                                color : "rgba(255,255,255,0.5)",
                                ...styles.fontNormal,
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
                                ...styles.fontLarge,
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
                                ...styles.fontNormal,
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
                                onPress={() => {navigation.navigate('SignInPage')}}
                            >
                                <Text
                                    style={{
                                        ...styles.fontMedium,
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
                                ...styles.fontSmall,
                                color:"rgba(255, 255,255,0.5)",
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
const styles = StyleSheet.create({
    fontLarge: {
        fontFamily : "Poppins-Regular",
        fontSize: 24,
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
export default SignInStartPage;

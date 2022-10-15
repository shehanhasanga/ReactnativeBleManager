import React, {FC} from "react";
import {
    ImageBackground,
    SafeAreaView,
    View,
    Text,
    TouchableOpacityComponent,
    TouchableOpacity,
    TextInput, KeyboardAvoidingView, ScrollView, Image, Dimensions, StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignInPage: FC= ({ theme,navigation}) => {
    const { width, height } = Dimensions.get('window');
    return(
        <>
            <SafeAreaView>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView>
                        <View>
                            <Image
                                style={{
                                    height : height,
                                    width : '100%',
                                }}
                                source={require("../assets/images/signin3.jpg")}
                            />
                            <View style={{
                                height : height,
                                width,
                                color : "white",
                                position : "absolute",
                                display : "flex",
                                flexDirection:"column"
                            }}>
                                <View style={{
                                    width : "100%",
                                    paddingLeft :20,
                                    marginTop :  30,
                                    display : "flex",
                                    flexDirection : "row",
                                    justifyContent : "space-between",
                                    alignItems : "center"
                                }}>
                                    <Icon.Button name="arrow-left" color="#4C4C4C" size={30} backgroundColor = "#000"  onPress = {() => {navigation.goBack()}} />
                                </View>
                                <View
                                    style={{
                                        display : "flex",
                                        height : "100%",
                                        width : "100%"
                                    }}
                                >
                                    <View style={{
                                        flex :4,

                                    }}>
                                        <View style={{
                                            flex :3,

                                        }}>
                                        </View>
                                        <View style={{
                                            flex :2,
                                            marginHorizontal :20,
                                        }}>
                                            <View style={{
                                                flex : 1,
                                                justifyContent : "center",
                                                marginTop : 10,
                                            }}>
                                                <Text
                                                    style={{
                                                        color : "white",
                                                        ...styles.fontLarge,
                                                    }}
                                                >Sign In</Text>
                                            </View>
                                            <View style={{
                                                flex : 2
                                            }}>
                                                <View style={{
                                                    backgroundColor : "#232323",
                                                    borderRadius : 30,
                                                    flexDirection : "row",
                                                    alignItems : "center",
                                                    paddingHorizontal : 20
                                                }}>
                                                    <Icon name="mail" color="#979797"  size={30} />
                                                    <TextInput
                                                        style={{
                                                            padding: 20,
                                                            marginHorizontal : 10,
                                                            ...styles.fontMedium,
                                                            flex : 1,
                                                            color : "#979797"
                                                        }}
                                                        placeholder="Sign In Email"
                                                        textAlign={'center'}
                                                        placeholderTextColor="#979797"

                                                    />
                                                </View>

                                                <View style={{
                                                    backgroundColor : "#232323",
                                                    borderRadius : 30,
                                                    flexDirection : "row",
                                                    alignItems : "center",
                                                    paddingHorizontal : 20,
                                                    marginTop : 10
                                                }}>
                                                    <Icon name="key" color="#979797"  size={30}  style={{transform: [{rotate: '315deg'}]}}/>
                                                    <TextInput
                                                        style={{
                                                            padding: 20,
                                                            marginHorizontal : 10,
                                                            ...styles.fontMedium,
                                                            flex : 1,
                                                            color : "#979797"
                                                        }}
                                                        placeholder="Password"
                                                        textAlign={'center'}
                                                        secureTextEntry={true}
                                                        placeholderTextColor="#979797"

                                                    />
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={{
                                        flex :2,
                                        marginHorizontal : 24,
                                        justifyContent:"space-between",
                                        marginBottom : 10

                                    }}>

                                        <View style={{
                                            flex : 1,
                                            justifyContent : "flex-end"
                                        }}>
                                            <Text style={{
                                                fontWeight:"400",
                                                ...styles.fontSmall,
                                                color : "rgba(255,255,255,0.5)",
                                            }}>Forgot password</Text>
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
                                                onPress={() => navigation.navigate("OnboardingQuestionsScreen")}
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
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
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
    }
});

export default SignInPage;

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


const LoginPage: FC= ({ theme,navigation}) => {
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
                                source={require("../assets/images/loginimage.jpg")}
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
                                        justifyContent:"center"
                                    }}
                                >
                                    <Text style={{
                                        fontSize : 30,
                                        fontWeight:"bold"
                                    }}>Sign in</Text>
                                </View>
                                <View
                                    style={{
                                        flex : 1,
                                        flexDirection:"column",
                                        justifyContent : "flex-start",
                                        marginTop : 20,

                                    }}
                                >
                                    <View style={{
                                        borderRadius: 5,
                                        borderColor:"#FFFF",
                                        borderWidth:0.15,
                                    }}>
                                        <View>
                                            <TextInput
                                                style={{
                                                    width: '100%',
                                                    padding: 10,
                                                }}
                                                placeholder="username"
                                                onChangeText={newText => {}}

                                            />

                                        </View>

                                        <View
                                        style={{
                                            height : 0.19,
                                            backgroundColor : "#FFFF",
                                            opacity : 0.4
                                        }}
                                        ></View>
                                        <TextInput
                                            style={{
                                                width: '100%',
                                                padding: 10,
                                            }}
                                            secureTextEntry={true}
                                            placeholder="password"
                                            onChangeText={newText => {}}
                                        />
                                    </View>


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
                                        }}>Sign In</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width : width * 0.7,
                                        marginTop : 10,
                                        alignItems:"center"
                                    }}>
                                        <Text style={{
                                            fontWeight:"bold"
                                        }}>Forgot your password?</Text>
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

export default LoginPage;

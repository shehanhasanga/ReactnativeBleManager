import React, {FC, useEffect, useState} from "react";
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
    TouchableOpacityComponent, TouchableOpacity, TextInput
} from "react-native";
import {RootState} from "../store/store";
import {USERID, USERNAME} from "../services/storage/storage";
import {fetchAuthToken} from "../store/auth/auth.actions";
;


const LoginPage: FC= ({ theme,navigation}) => {
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch();

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        console.log(dim.height >= dim.width)
        return dim.height >= dim.width;
    };
    const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
        isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
    );

    useEffect(() => {
        const callback = () => {
            let deviceIsPotrait: 'PORTRAIT' | 'LANDSCAPE' = 'PORTRAIT'
            if(isPortrait()){
                deviceIsPotrait = 'PORTRAIT'
            } else{
                deviceIsPotrait = 'LANDSCAPE'
            }
            setOrientation(deviceIsPotrait)
        };

        Dimensions.addEventListener('change', callback);

        return () => {
            Dimensions.removeEventListener('change', callback);
        };
    }, []);

    const usernameloaded = useSelector(
        (state: RootState) => state.storage[USERNAME],
    );
    const userIdLoaded = useSelector(
        (state: RootState) => state.storage[USERID],
    );

    useEffect(() => {
        if(userIdLoaded) {
            console.log("user id is " + userIdLoaded)
        }
    }, [userIdLoaded])
    useEffect(() => {

        if(usernameloaded){
            if(usernameloaded != ''){
                console.log("username is" + usernameloaded)
                navigation.navigate('PersonalDataPage')
            }
        }
    },[usernameloaded])
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const setText = (txt:string, type: string) => {
        if(type == 'password'){
            setPassword(txt)
        } else {
            setUsername(txt)
        }
    }

    const login = () => {
        if(password != '' && username != ''){
            dispatch(fetchAuthToken(username, password))
        }
    }
    return(
        <>
            <SafeAreaView>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <View>
                            <Image
                                style={{
                                    height : height,
                                    width : '100%',
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
                                        fontWeight:"bold",
                                        color : "white"
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
                                        borderWidth:0.5,
                                    }}>
                                        <View>
                                            <TextInput
                                                style={{
                                                    width: '100%',
                                                    padding: 20,
                                                }}
                                                placeholder="Username"
                                                placeholderTextColor="#B2BEB5"
                                                onChangeText={newText => setText(newText, "username")}

                                            />

                                        </View>

                                        <View
                                        style={{
                                            height : 0.5,
                                            backgroundColor : "#FFFF",
                                            opacity : 1
                                        }}
                                        ></View>
                                        <TextInput
                                            style={{
                                                width: '100%',
                                                padding: 20,
                                            }}
                                            secureTextEntry={true}
                                            placeholder="Password"
                                            placeholderTextColor="#B2BEB5"
                                            onChangeText={newText => setText(newText, "password")}
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
                                    <TouchableOpacity
                                        onPress={() => login()}
                                        style={{
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

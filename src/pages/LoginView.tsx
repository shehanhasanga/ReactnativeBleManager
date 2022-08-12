import React, {FC, useEffect, useState} from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import defaultTheme, {WithTheme} from "../theme/defaults";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthToken} from "../store/auth/auth.actions";
import {RootState} from "../store/store";
import {USERNAME} from "../services/storage/storage";


interface LoginViewProps extends WithTheme {
    navigation: any;
};


const LoginView: FC<LoginViewProps> = ({theme,navigation}) => {
    theme = defaultTheme
    const dispatch = useDispatch();

    const usernameloaded = useSelector(
        (state: RootState) => state.storage[USERNAME],
    );
    useEffect(() => {
        if(usernameloaded){
            if(usernameloaded != ''){
                console.log(usernameloaded)
                navigation.navigate('Main')
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
        <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.palette.statusBar}
        />
        <SafeAreaView
                 style={[styles.safeArea, {backgroundColor: theme.palette.background}]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.root}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={styles.scrollView}
                    keyboardShouldPersistTaps="handled">
                    <View
                        style={[styles.rootView, {backgroundColor:'#4f4624'}]}>
                        <View style={styles.main}>

                            <Image
                                style={{...styles.logo, margin: 20}}
                                source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                            />
                            <View style={{
                                display: "flex",
                                width: "70%",
                                marginTop: 50,
                                alignItems:"center"
                            }}>
                                <TextInput
                                    style={{
                                        width: '100%',
                                        padding: 10,
                                        borderRadius: 5,
                                        borderColor:"#000000",
                                        borderWidth:2,
                                        }}
                                    placeholder="username"
                                    onChangeText={newText => setText(newText, "username")}

                                />
                                <TextInput
                                    style={{
                                        width: '100%',
                                        padding: 10,
                                        borderRadius: 5,
                                        borderColor:"#000000",
                                        borderWidth:2,
                                        marginTop: 20
                                    }}
                                    secureTextEntry={true}
                                    placeholder="password"
                                    onChangeText={newText => setText(newText, "password")}
                                />

                                <TouchableOpacity
                                    onPress={() => login()}
                                    style={{
                                    marginTop : 30
                                }}>
                                    <View style={{
                                        backgroundColor : "#3f9824",
                                        padding: 20
                                    }}>
                                        <Text>Login</Text>
                                    </View>
                                </TouchableOpacity>

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
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    root: {
        flex: 1,
    },
    rootView: {
        alignItems: 'stretch',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    main: {
        alignItems: 'center',
    },
    logo: {
        width: '70%',
        height: undefined,
        resizeMode: 'contain',
        aspectRatio: 2,
    },
    cardActions: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    cardStyle: {
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: {height: 0.5, width: 0},
        elevation: 2,
    }
});

export default LoginView;

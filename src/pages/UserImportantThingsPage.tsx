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
import {getGetUserImportantThings} from "../store/userData/userdata.actions";
;


const UserImportantThingsPage: FC= ({ theme,navigation}) => {
    const { width, height } = Dimensions.get('window');
    const dispatch = useDispatch();
    const items  = [
        "Be more present and focused",
        "Be productive and energitic",
        "Improve my atheletic performance",
    ]
    const [userData , setUserData] = useState<[String]>(items)

    const usernameloaded = useSelector(
        (state: RootState) => state.storage[USERNAME],
    );

    const userImportantThings = useSelector(
        (state: RootState) => state.userData.userImportantThings,
    );
    const userIdLoaded = useSelector(
        (state: RootState) => state.storage[USERID],
    );

    const loadUserImportantThings = () => {
        dispatch(getGetUserImportantThings(""))
    }

    // useEffect(() => {
    //     loadUserImportantThings()
    // }, [])

    useEffect(() => {
        if(userImportantThings.length > 0){
            console.log("data came +++++++++++++userImportantThings")
            console.log(userImportantThings)
            setUserData(userImportantThings)
        }
    }, [userImportantThings])


    // useEffect(() => {
    //     if(userIdLoaded) {
    //         console.log("user id is " + userIdLoaded)
    //     }
    // }, [userIdLoaded])
    // useEffect(() => {
    //
    //     if(usernameloaded){
    //         if(usernameloaded != ''){
    //             console.log("username is" + usernameloaded)
    //             // navigation.navigate('PersonalDataPage')
    //         }
    //     }
    // },[usernameloaded])

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
                    <ScrollView >
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
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={{
                                        display : "flex",
                                        flexDirection:"column",
                                        padding : 20
                                    }}>
                                        <View
                                            style={{
                                                flex : 4,
                                                flexDirection:"column",
                                                justifyContent:"flex-end",
                                                marginTop : 50
                                            }}
                                        >
                                            <Text style={{
                                                fontSize : 24,
                                                fontWeight:"bold",
                                                textAlign : "center",
                                                color : "white"
                                            }}>What is your focus area?</Text>
                                            <Text style={{
                                                fontSize : 18,
                                                color : "white"
                                            }}>Choose the most important thing for you right now.</Text>

                                        </View>
                                        <View
                                            style={{
                                                flex : 2,
                                                flexDirection:"column",
                                                justifyContent : "flex-start",
                                                marginTop : 20,

                                            }}
                                        >
                                            {userData.map((item, index) => {
                                                return (  <View  key={index} style={{
                                                    borderRadius: 5,
                                                    borderColor:"#5289b1",
                                                    borderWidth:1,
                                                    marginVertical : 10
                                                }}>
                                                    <View style={{
                                                        paddingHorizontal:20,
                                                        paddingVertical : 30

                                                    }}>
                                                        <Text style={{
                                                            fontWeight : "bold"
                                                        }}>
                                                            {item}
                                                        </Text>

                                                    </View>

                                                </View>);
                                            })}


                                        </View>
                                    </View>
                                </ScrollView>

                                <View
                                    style={{
                                        position : "absolute",
                                        backgroundColor : "black",
                                        width : "100%",
                                        alignItems : "center",
                                        bottom : 0
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => loadUserImportantThings()}
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
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>

    );

}

export default UserImportantThingsPage;

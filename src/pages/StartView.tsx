import React, {FC, useEffect} from "react";
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
    TouchableOpacityComponent, TouchableOpacity
} from "react-native";
import {RootState} from "../store/store";
import {USERID, USERNAME} from "../services/storage/storage";
;


interface StartViewProps extends WithTheme {
    navigation: any;
};
const StartView: FC= ({ theme,navigation}) => {
    theme = defaultTheme
    const dispatch = useDispatch();

    const userIdLoaded = useSelector(
        (state: RootState) => state.storage[USERID],
    );

    useEffect(() => {
        console.log(userIdLoaded)
    } ,[userIdLoaded])

    const usernameloaded = useSelector(
        (state: RootState) => state.storage[USERNAME],
    );
    const { width, height } = Dimensions.get('window');
    useEffect(() => {
        if(usernameloaded){
            if(usernameloaded != ''){
                console.log(usernameloaded)
                navigation.navigate('PersonalDataPage')
            }
        }
    },[usernameloaded])


    return(
        <>
            {/*<StatusBar*/}
            {/*    barStyle="dark-content"*/}
            {/*    backgroundColor={theme.palette.statusBar}*/}
            {/*/>*/}
            <SafeAreaView>
                <KeyboardAvoidingView>
                    <ScrollView>
                        {/*<Text>Start View</Text>*/}
                        <View>
                            <Image
                                style={{
                                    height : height,
                                    width,
                                }}
                                source={require("../assets/images/startimage.jpg")}
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
                                        fontWeight : "bold"
                                    }}>OURA</Text>
                                </View>
                                <View
                                style={{
                                    flex : 3,

                                }}
                                >
                                    <Text
                                        style={{
                                        fontSize : 30
                                    }}
                                    >Personal Insights to </Text>
                                    <Text
                                        style={{
                                            fontSize : 30
                                        }}
                                    >Empower your  </Text>
                                    <Text
                                        style={{
                                            fontSize : 30
                                        }}
                                    >Every day  </Text>
                                </View>
                                <View style={{
                                    flex:2,
                                    justifyContent:"center",
                                    alignItems:"center"
                                }}>
                                   <TouchableOpacity
                                       onPress={() => navigation.navigate('LoginPage')}
                                       style={{
                                       width : width * 0.7,
                                       margin : 20,
                                       padding : 20,
                                       alignItems:"center",
                                       backgroundColor:"white",
                                       borderRadius : 30
                                   }}>
                                       <Text style={{
                                           color : "black",
                                           fontWeight : "bold"
                                       }}>Start</Text>
                                   </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        width : width * 0.7,
                                        marginTop : 10,
                                        alignItems:"center"
                                    }}>
                                        <Text style={{
                                            fontWeight:"bold"
                                        }}>No oura Ring yet?</Text>
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
export default StartView;

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
    TouchableOpacityComponent, TouchableOpacity
} from "react-native";
;


interface StartViewProps extends WithTheme {
    navigation: any;
};
const StartView: FC= ({ theme,navigation}) => {
    theme = defaultTheme
    const dispatch = useDispatch();
    const { width, height } = Dimensions.get('window');

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
                                   <TouchableOpacity style={{
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

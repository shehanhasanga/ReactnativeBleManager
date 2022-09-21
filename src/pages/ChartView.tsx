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
    TouchableOpacityComponent, TouchableOpacity
} from "react-native";
import {RootState} from "../store/store";
import {DEVICEID, USERID, USERNAME} from "../services/storage/storage";
import {BleManager} from "react-native-ble-plx";
import blemanager from "../services/bluetooth/BLEManager";
;
import EventEmitter from 'EventEmitter';
import withTheme from "../theme/withTheme";
import {setStatusBarColor} from "../theme/actions";
import PushNotification , {Importance} from "react-native-push-notification";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
interface ChartViewProps extends WithTheme {
    navigation: any;
};
const ChartView: FC= ({ theme,navigation}) => {
    console.log(theme)
    const dispatch = useDispatch();
    const [connectedDeviceId, setConnectedDeviceId] = useState<string>();

    const connectedDevices = useSelector(
        (state: RootState) => state.bluetooth.connectedDeviceList,
    );

    const userIdLoaded = useSelector(
        (state: RootState) => state.storage[USERID],
    );

    const deviceId = useSelector(
        (state: RootState) => state.storage[DEVICEID],
    );





    useEffect(() => {

        // PushNotification.popInitialNotification((notification) => {
        //     console.log('Initial Notification', notification);
        // });
    }, [])

    useEffect(() => {
        // add a new device for auto connect
        if(deviceId){
            console.log(deviceId)
            let id = deviceId.split(" ")[0]
            setConnectedDeviceId(id)
            console.log(id)
            blemanager.addDetachedDevice(id)
        }

    } ,[deviceId])

    useEffect(() => {
        console.log(userIdLoaded)
    } ,[userIdLoaded])

    const usernameloaded = useSelector(
        (state: RootState) => state.storage[USERNAME],
    );
    const { width, height } = Dimensions.get('window');
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return(
        <>
            <SafeAreaView>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <View>
                            <View style={{
                                height : height,
                                width,
                                backgroundColor: "black",
                                color : "white",
                                display : "flex",
                                flexDirection:"column",
                                padding : 20
                            }}>

                                <View
                                style={{
                                    flex : 3,

                                }}
                                >
                                    <LineChart
                                        data={{
                                            labels: ["January", "February", "March", "April", "May", "June"],
                                            datasets: [
                                                {
                                                    data: [
                                                        Math.random() * 100,
                                                        Math.random() * 100,
                                                        Math.random() * 100,
                                                        Math.random() * 100,
                                                        Math.random() * 100,
                                                        Math.random() * 100
                                                    ]
                                                }
                                            ]
                                        }}
                                        withDots = {true}
                                        renderDotContent ={({x, y, index, indexData}) => {
                                            return <View
                                                key = {indexData}
                                                style={{
                                                position:"absolute",
                                                left :x,
                                                top : y
                                            }
                                            }><Text style={{

                                            }
                                            }>{indexData}</Text></View>
                                        }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={220}
                                        yAxisLabel="$"
                                        yAxisSuffix="k"
                                        yAxisInterval={1} // optional, defaults to 1
                                        chartConfig={{
                                            backgroundColor: "#e26a00",
                                            backgroundGradientFrom: "#fb8c00",
                                            backgroundGradientTo: "#ffa726",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#ffa726"
                                            }
                                        }}
                                        bezier
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16
                                        }}
                                    />

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

                                    <TouchableOpacity
                                        onPress={() => {}}
                                        style={{
                                        width : width * 0.7,
                                        marginTop : 10,
                                        alignItems:"center",
                                        backgroundColor : theme.palette.success
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
export default withTheme<ChartViewProps>()(ChartView);

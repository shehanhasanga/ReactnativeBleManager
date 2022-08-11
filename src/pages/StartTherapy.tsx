import React, {FC, useEffect, useState} from 'react';
import {BluetoothPeripheral} from "../models/BluetoothPeripheral";
import {
    View,
    Text,
    FlatList,
    TouchableHighlightComponent,
    TouchableOpacityComponent,
    TouchableOpacity, ListRenderItemInfo
} from "react-native";
import {Session, TherapyConfig} from "../store/bluetooth/bluetooth.types";
import DeviceListItem from "../components/listItems/DeviceListItem";
import {isAsyncThunkAction} from "@reduxjs/toolkit";


const StartTherapyView: FC = ({ route, navigation }) => {
    const { deviceId } = route.params;


    const [session, setSesston] = useState<any>('')
    const getData = async () => {
        const therapy1 : TherapyConfig = {
            pattern : 1,
            itensity : 1,
            time : 10
        }
        const therapy2: TherapyConfig = {
            pattern : 0,
            itensity : 2,
            time : 3
        }
        const therapy3 : TherapyConfig = {
            pattern : 1,
            itensity : 0,
            time : 3
        }
        const therapyList:Array<TherapyConfig> = new Array<TherapyConfig>()
        therapyList.push(therapy1)
        therapyList.push(therapy2)
        therapyList.push(therapy3)

        const session1 : Session = {
            deviceIdAndroid : deviceId,
            deviceIdIos : "",
            elapseTime : 14,
            therapyList : therapyList,
            totalTime : 18
        }
        let sum = 0
        for(let i = 0 ; i < session1.therapyList.length ; i++){
            sum = sum + session1.therapyList[i].time
            if(session1.elapseTime > sum){
                session1.therapyList[i].progress = session1.therapyList[i].time
            } else {
                if((sum - session1.elapseTime) > session1.therapyList[i].time){
                    session1.therapyList[i].progress = 0
                } else {
                    session1.therapyList[i].progress = session1.therapyList[i].time - (sum - session1.elapseTime)
                }

            }

        }
         setSesston(session1)
    }

    useEffect(() => {
        getData()
    }, [])

    const setProgress = ( ) => {


    }


    const TherapyItem = (item, index, separators, processedTime) => {
        const therapy: TherapyConfig = item
        let progress: number =  Math.round((((therapy.progress)? therapy.progress : 0 )/ therapy.time) * 100)
         progress = "" + progress + "%"
        return(
            <View style={{
                backgroundColor : "#4f4624",
                alignSelf: 'flex-start',
                marginVertical : 10,
                width : "75%",
                padding : 15,
                borderRadius : 10,
                shadowColor : 'white',
                shadowRadius : 20,
                shadowOffset : 2,
                shadowOpacity : 1
            }}>
                <View style={{
                    display :'flex',
                    alignItems : "center",
                    flexDirection : "row",
                }}>
                    <Text style={{
                        fontWeight : "bold",
                        color : 'white',
                        fontSize : 20
                    }}>Pattern  </Text>
                    <Text style={{
                        fontSize : 16
                    }}>Pattern {therapy.pattern} </Text>
                    <Text>Progress {therapy.progress}</Text>
                </View>
                <View style={{
                    display :'flex',
                    flexDirection :"row",
                    alignSelf: 'flex-start',
                    marginTop : 5,
                    justifyContent : "space-between"
                }}>
                    <View style={{
                        display :"flex",
                        flexDirection : "row",
                        alignSelf: 'flex-start',
                        alignItems : "flex-end",
                        marginRight : 20
                    }}
                    >
                        <Text style={{
                            fontSize : 16,
                            color : "white",
                            fontWeight : "bold"
                        }}>Intensity : </Text>
                        <Text style={{
                            fontSize : 14,
                            fontWeight : "bold"
                        }}> {therapy.itensity}</Text>
                    </View>

                    <View style={{

                        display :"flex",
                        flexDirection : "row",
                        alignItems :"center",
                        alignSelf: 'flex-start'
                    }}
                    >
                        <Text style={{
                            fontSize : 16,
                            color : "white",
                            fontWeight : "bold"
                        }}>Time : </Text>
                        <Text style={{
                            fontSize : 14,
                            fontWeight : "bold"
                        }}>{therapy.time} min</Text>
                    </View>

                </View>
                <View style={{
                    justifyContent:"center"
                }}>
                    <View style={{
                        marginTop : 20,
                        height : 2,

                        backgroundColor : "#8a8a8a",
                    }}>

                    </View>
                    <View style={{
                        top: -2,
                        marginBottom : 10,
                        height : 3,
                        width : progress,
                        backgroundColor : "#00FF00",

                    }}></View>
                </View>

            </View>
        )
    }

    return(
        <View style={{
            backgroundColor : "#5a5a5c",
            height: '100%',
            paddingHorizontal : 10
        }}>
            {/*<Text>Start therapy</Text>*/}
            {/*<Text>Therapy Session </Text>*/}
            <FlatList style={{

            }}

                contentContainerStyle={{
                    flex : 100
                }}
                data={session?.therapyList}

                renderItem={({ item, index, separators }) => (
                    TherapyItem(item, index, separators, session?.progress)

                )}


            />
            <View style={{
                flex : 1
            }}
            ></View>
            <Text>Start</Text>

        </View>
    )


}
export default StartTherapyView;

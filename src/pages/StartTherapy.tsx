import React, {FC, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from "react-native";

import Command, {CommandType} from "../models/Ble/commands/Command";
import {sendCommand} from "../store/bluetooth/actions";
import {fetchSesstion, updateSesstion} from "../store/session/session.action";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Session, TherapyConfig} from "../store/session/session.types";


const StartTherapyView: FC = ({ route, navigation }) => {
    var sessionId = "123456"
    const { deviceId } = route.params;
    const dispatch = useDispatch();

    const startProcess = () => {
        dispatch(sendCommand(new Command(deviceId, CommandType.START)))
    }
    const gotoProgress = () => {
        navigation.navigate('DeviceView', {deviceId: deviceId});
    }
    const getdata = () => {
        dispatch(fetchSesstion("", ""))
    }
    const sessionData = useSelector(
        (state: RootState) => state.session.sessionList,
    );
    useEffect(() => {
        getdata()

    }, [])

    useEffect(() => {
        if(sessionData){
            if(sessionData.length > 0){
                let updatedSession = sessionData.find(item => item.sessionId == sessionId)
                if(updatedSession) {
                    // setSesston(updatedSession)
                    setViewData(updatedSession)
                }

            }

        }
    }, [sessionData])


    const updateSession = () => {
        dispatch(updateSesstion("", "", 4))
    }

    const [session, setSesston] = useState<any>('')
    const setViewData = async (sessiondata :Session) => {
        let session : Session = {
            sessionId : sessiondata.sessionId,
            deviceIdAndroid : sessiondata.deviceIdAndroid,
            deviceIdIos : sessiondata.deviceIdIos,
            elapseTime: sessiondata.elapseTime,
            therapyList : sessiondata.therapyList
        }

        let sum = 0
        let list = []
        for(let i = 0 ; i < session.therapyList.length ; i++){
            sum = sum + session.therapyList[i].time
            let therapyConfig : TherapyConfig = {
                pattern : session.therapyList[i].pattern,
                time : session.therapyList[i].time,
                itensity : session.therapyList[i].itensity
            }
            if(session.elapseTime > sum){
                therapyConfig.progress = session.therapyList[i].time
            } else {
                if((sum - session.elapseTime) > session.therapyList[i].time){
                    therapyConfig.progress = 0
                } else {
                    therapyConfig.progress = session.therapyList[i].time - (sum - session.elapseTime)
                }
            }
            list.push(therapyConfig)

        }
        session.therapyList = list
        setSesston(session)
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
            <FlatList style={{

            }}

                contentContainerStyle={{

                }}
                data={session?.therapyList}

                renderItem={({ item, index, separators }) => (
                    TherapyItem(item, index, separators, session?.progress)

                )}


            />
            <View style={{
                flex : 1,
                alignItems :"center",
            }}
            >
                <TouchableOpacity
                    style={{
                        width:"70%"
                    }}
                    onPress={() => {startProcess()}}
                >
                    <View style={{
                        alignItems :"center",
                        padding: 10,
                        backgroundColor : "#0000ff",

                    }}>
                        <Text>start</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width:"70%"
                    }}
                    onPress={() => {gotoProgress()}}
                >
                    <View style={{
                        alignItems :"center",
                        padding: 10,
                        backgroundColor : "#0000ff",

                    }}>
                        <Text>view details</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )


}
export default StartTherapyView;



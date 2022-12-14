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
    TouchableOpacityComponent, TouchableOpacity, TextInput, StyleSheet, Modal, Alert, Pressable, Keyboard
} from "react-native";
;
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {RootState} from "../store/store";
import {USERID, USERNAME} from "../services/storage/storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {fetchAuthToken, saveUserDataAction, UserData} from "../store/auth/auth.actions";
import LoadingModal from "../components/modals/LoadingModal";

const PersonalDataPage: FC= ({ theme,navigation}) => {
    const { width, height } = Dimensions.get('window');
    const [modalVisible, setModalVisible] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [weightModalVisible, setweightModalVisible] = useState(false);
    const [gender, setGender] = useState<String>("Male")
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date(1994, 10, 30));
    const [feet, setFeet] = useState<number>(5);
    const [inch, setInch] = useState<number>(5);
    const [weight, setWeight] = useState<number>(130);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [userId, setUserId] = useState();
    const userIdChange = useSelector(
        (state: RootState) => state.storage[USERID],
    );
    const loaderChange = useSelector(
        (state: RootState) => state.global.loader,
    );

    const successSaveUserData = useSelector(
        (state: RootState) => state.auth.isFinishedSaveUserData,
    );

    useEffect(() => {
        if(successSaveUserData){
            gotoPermissionsPage()
        }
    }, [successSaveUserData])

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("get loader state")
        // console.log(loaderChange)
        setShowLoadingModal(loaderChange.open)

    } ,[loaderChange])

    useEffect(() => {
        if(userIdChange){
            if(userIdChange != userId){
                setUserId(userIdChange)
            }
        }
    },[userIdChange])

    const gotoPermissionsPage = () => {
        navigation.navigate('GrantPermissionPage')
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const getDate = () : String=> {
        var dateString = ""
        dateString += monthNames[date.getMonth()] + " "
        dateString += date.getDate() + ", "
        dateString += date.getFullYear()
        return dateString

    }
    const handleConfirm = (date) => {
        setDate(date)
        hideDatePicker();
    };

    const handleGender = (genderId:String) => {
        console.log("handle gender")
        setGender(genderId);
    }
    const handleInch = (numString: String) => {
        const feetValue = Number.parseInt(numString)
        if (Number.isNaN(feetValue)) {

        } else {
            setInch(feetValue)
        }
    }

    const handleFeet = (numString: String) => {
        const feetValue = Number.parseInt(numString)
        if (Number.isNaN(feetValue)) {

        } else {
            setFeet(feetValue)
        }
    }
    const handleWeight = (numString: String) => {
        const feetValue = Number.parseInt(numString)
        if (Number.isNaN(feetValue)) {

        } else {
            setWeight(feetValue)
        }
    }

    const sendUserData = () => {
        if(feet > 0){
            let heightString = feet.toString() + ":" + inch.toString();
            let dobString = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
            let userData : UserData =  {
                userId : userId,
                dateOfBirth : dobString,
                height : heightString,
                weight : weight.toString(),
                gender : gender
            }
            console.log(userData)
            dispatch(saveUserDataAction(userData))
        }

    }

    const GenderRow = (props: {id : string, callback : () => void }  ) => {
        return (
            <TouchableOpacity
                onPress={() => {handleGender(props.id)}}
            >
                <View style={{
                    display : "flex",
                    flexDirection : "row",
                    justifyContent : "space-between",
                    margin:10,
                    width : "70%",
                    borderBottomColor : "black",
                    borderBottomWidth : 1
                }}>
                    <Text>{props.id}</Text>
                    <Icon name= "check"  color={ gender == props.id ? "blue" : "white"}  size={24} />
                </View>
            </TouchableOpacity>
        )
    }

    const updateGenderModal = () => {
        return(
            <View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={genderModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!genderModalVisible);
                    }}
                >
                    <View style={{
                        alignItems : "center",
                        justifyContent : "center"
                    }}>
                        <View style={{
                            height :"100%",
                            width : "100%",
                            backgroundColor : "black",
                            opacity : 0.4
                        }}>
                        </View>
                        <View style={styles.centeredView}>

                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Select Gender</Text>
                                <GenderRow id={"Male"} callback={() => {}}  />
                                <GenderRow id={"Fe-Male"} callback={() => {}} />
                                <GenderRow id={"Other"} callback={() => {}} />

                                <View style={{
                                    alignItems:"flex-end"
                                }}>
                                    <Pressable
                                        style={{
                                            width : "15%"
                                        }}
                                        onPress={() => {
                                            Keyboard.dismiss()
                                            setGenderModalVisible(!genderModalVisible)
                                        }}
                                    >
                                        <Text >ok</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        )
    }

    const updateWeightModal = () => {
        return(
            <View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={weightModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{
                        alignItems : "center",
                        justifyContent : "center"
                    }}>
                        <View style={{
                            height :"100%",
                            width : "100%",
                            backgroundColor : "black",
                            opacity : 0.4
                        }}>
                        </View>
                        <View style={styles.centeredView}>

                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Weight(lbs)</Text>
                                <View style={{
                                    display : "flex",
                                    flexDirection : "row",
                                    justifyContent : "space-between",
                                    marginBottom : 20
                                }}>
                                    <View style={{
                                        flex : 2,
                                        display : "flex",
                                        flexDirection : "row",
                                    }}>
                                        <TextInput
                                            defaultValue={weight.toString()}
                                            style={{
                                                width : "100%",
                                                padding : 0,
                                                borderColor : "#424242",
                                                borderBottomColor : "white",
                                                borderWidth : 1,
                                                color : "white",

                                            }}
                                            textAlign="left"
                                            keyboardType="numeric"
                                            onChangeText={newText => {handleWeight(newText)}}

                                        />
                                        <Text>lb</Text>
                                    </View>
                                    <View style={{
                                        flex: 1
                                    }}></View>


                                </View>
                                <View style={{
                                    alignItems:"flex-end"
                                }}>
                                    <Pressable
                                        style={{
                                            width : "15%"
                                        }}
                                        onPress={() => {
                                            Keyboard.dismiss()
                                            setweightModalVisible(!weightModalVisible)
                                        }}
                                    >
                                        <Text >ok</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
            );

    }
    const updateHeightModal = () => {
        return (
            <View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{
                        alignItems : "center",
                        justifyContent : "center"
                    }}>
                        <View style={{
                            height :"100%",
                            width : "100%",
                            backgroundColor : "black",
                            opacity : 0.4
                        }}>
                        </View>
                        <View style={styles.centeredView}>

                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Height</Text>
                                <View style={{
                                    display : "flex",
                                    flexDirection : "row",
                                    justifyContent : "space-between",
                                    marginBottom : 20
                                }}>
                                    <View style={{
                                        flex : 2,
                                        display : "flex",
                                        flexDirection : "row",
                                    }}>
                                        <TextInput
                                            defaultValue={feet.toString()}
                                            style={{
                                                width : "80%",
                                                padding : 0,
                                                borderColor : "#424242",
                                                borderBottomColor : "white",
                                                borderWidth : 1,
                                                color : "white",

                                            }}
                                            textAlign="left"
                                            keyboardType="numeric"
                                            onChangeText={newText => {handleFeet(newText)}}

                                        />
                                        <Text>ft</Text>
                                    </View>
                                    <View style={{
                                        flex: 1
                                    }}></View>
                                    <View style={{
                                        flex : 2,
                                        display : "flex",
                                        flexDirection : "row",
                                    }}>
                                        <TextInput
                                            defaultValue={inch.toString()}
                                            style={{
                                                width : "80%",
                                                padding : 0,
                                                borderColor : "#424242",
                                                borderBottomColor : "white",
                                                borderWidth : 1,
                                                color : "white",

                                            }}
                                            textAlign="left"
                                            keyboardType="numeric"
                                            onChangeText={newText => {handleInch(newText)}}

                                        />
                                        <Text>in</Text>
                                    </View>

                                </View>
                                <View style={{
                                    alignItems:"flex-end"
                                }}>
                                    <Pressable
                                        style={{
                                            width : "15%"
                                        }}
                                        onPress={() => {
                                            console.log("pressed clicked+")
                                            Keyboard.dismiss()
                                            setModalVisible(!modalVisible)
                                        }}
                                    >
                                        <Text >ok</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        )
    }

    return(
        <>
            <SafeAreaView>
                {/*<KeyboardAvoidingView>*/}
                    <ScrollView keyboardShouldPersistTaps='handled'>
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
                                width : '100%',
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
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }}
                                >
                                    <Text style={styles.headerTxt}>Check your personal info</Text>
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
                                    display : "flex",
                                    flexDirection : "row",
                                    justifyContent : "space-between",
                                    marginBottom : 20

                                }}>
                                    <Text style={styles.formTxt}>Date of birth</Text>
                                    <Text style={styles.formTxt}
                                          onPress={showDatePicker}
                                    >{getDate()}</Text>

                                </View>
                                    <View style={{
                                        display : "flex",
                                        flexDirection : "row",
                                        justifyContent : "space-between",
                                        marginBottom : 20

                                    }}>
                                        <Text style={styles.formTxt}>Height</Text>
                                        <Text onPress={() => {setModalVisible(true)}} style={styles.formTxt}>{feet.toString()} ft {inch.toString()} in</Text>

                                    </View>
                                    <View style={{
                                        display : "flex",
                                        flexDirection : "row",
                                        justifyContent : "space-between",
                                        marginBottom : 20

                                    }}>
                                        <Text style={styles.formTxt}>Weight</Text>
                                        <Text onPress={() => {setweightModalVisible(true)}}  style={styles.formTxt}>{weight} lbs</Text>

                                    </View>

                                    <View style={{
                                        display : "flex",
                                        flexDirection : "row",
                                        justifyContent : "space-between",
                                        marginBottom : 20

                                    }}>
                                        <Text style={styles.formTxt}>Gender</Text>
                                        <Pressable
                                            onPress={() => {setGenderModalVisible(true)}}
                                        >
                                            <View>

                                                <Text style={styles.formTxt}>{gender}</Text>
                                            </View>

                                        </Pressable>


                                    </View>
                                    <View>
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="date"
                                            date = {date}
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
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
                                        onPress={() => sendUserData()}
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
                                        }}>Done</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            {updateHeightModal()}
                            {updateWeightModal()}
                            {updateGenderModal()}
                            {showLoadingModal ?(<LoadingModal callback={() => {}} message={""}/>) : (<></>) }

                        </View>
                    </ScrollView>
                {/*</KeyboardAvoidingView>*/}
            </SafeAreaView>
        </>

    );

}

export default PersonalDataPage;
const styles = StyleSheet.create({
    headerTxt : {
        fontSize : 24,
        color: "white"
    },
    formTxt : {
        fontSize:16,
        color:"white",
        fontWeight : "400"
    },
    centeredView: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        position : "absolute"
    },
    modalView: {
        margin: 20,
        backgroundColor: "#424242",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 5,

    }
})

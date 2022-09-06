import React, {FC, useState} from "react";
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
    TouchableOpacityComponent, TouchableOpacity, TextInput, StyleSheet, Modal, Alert, Pressable, Keyboard
} from "react-native";
;
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PersonalDataPage: FC= ({ theme,navigation}) => {
    const { width, height } = Dimensions.get('window');
    const [modalVisible, setModalVisible] = useState(false);
    const [weightModalVisible, setweightModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date(1994, 10, 30));
    const [feet, setFeet] = useState<number>(6);
    const [weight, setWeight] = useState<number>(130);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
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
                                            value={feet.toString()}
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
                                            // onChangeText={newText => {}}

                                        />
                                        <Text>ft</Text>
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
                                        <Text onPress={() => {setModalVisible(true)}} style={styles.formTxt}>{feet.toString()} ft 5 in</Text>

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
                                        <Text style={styles.formTxt}>Male</Text>

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
                                        onPress={() => setModalVisible(true)}
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

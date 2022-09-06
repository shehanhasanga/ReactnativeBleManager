import React, {FC, useState} from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard, ActivityIndicator} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
type InfoModalProps = {
    message: string,
    callback : () => void
};
const LoadingModal: FC<InfoModalProps> = props => {
    const [modalVisible, setModalVisible] = useState(true);
    return (
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
                    opacity : 0.7
                }}>
                </View>
                <View style={styles.centeredView}>
                    <View
                    style={{
                        top : 20,
                        right : 20,
                        position : "absolute"
                    }}
                    >
                        <Icon.Button name="close-circle" color="white" size={30} backgroundColor = 'rgba(34,36,39, 0.1)'  onPress = {() => {}} />

                    </View>
                    <View
                        style={{
                            height : "100%",
                            justifyContent : "center",
                            width : "100%",
                        }}
                    >
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                </View>
            </View>

        </Modal>
    )
}
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
        height: "100%",
        width: "100%",
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
export default LoadingModal;

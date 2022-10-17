import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {TherapyConfig} from "../../store/session/session.types";
import {Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type TherapyConfigDialogProps = {
    therapyConfig: TherapyConfig;
    callback: (therapyConfig: TherapyConfig) => void;
};
const TherapyConfigDialog: FC<TherapyConfigDialogProps> = props => {
    let {therapyConfig, callback} = props
    const { width, height } = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    const [showConfigDialog, setShowConfigDailog] = useState(false);
    const availableHeight = height - (insets.bottom + insets.top);
    const [openFrequency, setOpenFrequency] = useState(false);
    const [frequency, setFrequency] = useState(therapyConfig.itensity);
    const [frequencyItems, setFrequencyItems] = useState([
        {label: 'Low', value: 1},
        {label: 'Medium', value: 2},
        {label: 'High', value: 3}
    ]);
    useEffect(() => {
        showConfig()
    }, []);
    const [openMode, setOpenMode] = useState(false);
    const [modeValue, setModeValue] = useState(therapyConfig.pattern);
    const [modeItems, setModeItems] = useState([
        {label: 'Graduated', value: 1},
        {label: 'Pulsated', value: 2}
    ]);
    const showConfig = () => {
        setShowConfigDailog(true)
        handleAnimation();
    }

    const onFrequencyOpen = useCallback(() => {
        setOpenMode(false);
    }, []);

    const onModeOpen = useCallback(() => {
        setOpenFrequency(false);;
    }, []);
    const animation = useRef(new Animated.Value(0));
    const closeConfigDialog = () => {
        console.log("closing dialog")
        Animated.timing(animation.current, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start( () => {
            console.log("closed the dialog")
            setShowConfigDailog(false)
            let therapyConfignew : TherapyConfig = {
                pattern : modeValue,
                itensity : frequency,
                time : 10
            }
            callback(therapyConfignew)
        });

    }
    const handleAnimation = () => {
        Animated.spring(animation.current, {
            toValue: -(availableHeight / 1.8),
            duration: 3000,
            useNativeDriver: true,
        }).start();
        console.log(animation.current)
    };
    return(
        <View style={{
            height: "100%",
            width : "100%",
            position : "absolute",
            zIndex : 100,
            backgroundColor : "rgba(0,0,0,0.7)"
        }}
        >
            <Animated.View style={{
                transform: [{translateY: animation.current}],
                position : "absolute",
                bottom : -(availableHeight / 1.8),
                width : "100%",
                backgroundColor : "#131313",
                borderTopLeftRadius : 30,
                borderTopRightRadius : 30,
                padding :30,
                height : availableHeight / 1.8 }}>
                <Text style={{
                    ...styles.fontLarge,
                    color:"white"

                }}>Configure workout</Text>
                <View style={{
                    flexDirection : "row",
                    justifyContent : "center"
                }}>
                    <TouchableOpacity
                        onPress={() => {closeConfigDialog()}}
                        style={{
                            paddingVertical: 5,
                            paddingHorizontal : 10,
                        }}>
                        <Text style={{
                            ...styles.fontMedium,
                            color : "#F23847"
                        }}>Select therapy</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex:1,
                    display : "flex",
                }}>

                    <View style={{
                        flex : 1,
                        marginTop: 10,
                        width : "100%",
                        paddingHorizontal : 10,
                        flexDirection : "row",
                        alignItems : "center",
                        backgroundColor : "#232323",
                        borderRadius : 20,
                        position :"relative",
                        zIndex: openFrequency ? 1: 0
                    }}>
                        <Text style={{
                            ...styles.fontMedium,
                            color : "#979797",
                            flex :1,

                        }}>Frequency</Text>
                        <View style={{
                            flex: 2,
                            height : "100%",
                        }}>
                            <View style={{
                                flex :1,
                                paddingHorizontal : 20,
                                justifyContent : "center",

                            }}>
                                <DropDownPicker
                                    onOpen={onFrequencyOpen}
                                    listMode="SCROLLVIEW"
                                    dropDownDirection="TOP"
                                    open={openFrequency}
                                    value={frequency}
                                    items={frequencyItems}
                                    setOpen={setOpenFrequency}
                                    setValue={setFrequency}
                                    setItems={setFrequencyItems}
                                    arrowIconStyle={{
                                        display : "none"
                                    }}

                                    style={{backgroundColor : "#232323", borderColor:"#232323"}}
                                    textStyle={{
                                        color : "black",
                                        ...styles.fontMedium
                                    }}
                                    labelStyle={{
                                        color : "white",
                                        ...styles.fontMedium
                                    }}
                                />
                            </View>
                        </View>

                    </View>
                    <View style={{
                        flex :1,
                        backgroundColor : "#232323",
                        marginTop: 10,
                        width : "100%",
                        paddingHorizontal : 10,
                        flexDirection : "row",
                        alignItems : "center",
                        borderRadius : 20,
                        zIndex: openMode ? 1: 0
                    }}>
                        <Text style={{
                            ...styles.fontMedium,
                            color : "#979797",
                            flex :1
                        }}>Mode</Text>
                        <View style={{
                            flex: 2,
                            height : "100%",
                        }}>
                            <View style={{
                                flex :1,
                                paddingHorizontal : 20,
                                justifyContent : "center",
                            }}>
                                <DropDownPicker
                                    onOpen={onModeOpen}
                                    zIndex={1000}
                                    zIndexInverse={3000}
                                    open={openMode}
                                    value={modeValue}
                                    items={modeItems}
                                    setOpen={setOpenMode}
                                    setValue={setModeValue}
                                    setItems={setModeItems}
                                    showTickIcon={true}
                                    arrowIconStyle={{
                                        display : "none"
                                    }}
                                    dropDownDirection="TOP"
                                    style={{backgroundColor : "#232323", borderColor:"#232323"}}
                                    textStyle={{
                                        color : "black",
                                        ...styles.fontMedium
                                    }}
                                    labelStyle={{
                                        color : "white",
                                        ...styles.fontMedium
                                    }}
                                />
                            </View>
                        </View>

                    </View>

                    <View style={{
                        flex : 1,
                        marginTop: 10,
                        width : "100%",
                        paddingHorizontal : 10,
                        flexDirection : "row",
                        alignItems : "center",
                        backgroundColor : "#232323",
                        borderRadius : 20,
                        position :"relative"
                    }}>
                        <Text style={{
                            ...styles.fontMedium,
                            color : "#979797",
                            flex :1
                        }}>Time</Text>
                        <View style={{
                            flex :2,
                            justifyContent : "center",
                        }}>
                            <TouchableOpacity style={{
                                paddingHorizontal : 30,
                            }}>
                                <Text style={{
                                    ...styles.fontMedium,
                                    color:"white"

                                }}>10 min</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                    <View style={{
                        flex :1,
                        borderRadius : 20,
                        zIndex: 0,
                        marginTop: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => {closeConfigDialog()}}
                            style={{
                                flex :1,
                                justifyContent:"center",
                                borderRadius : 20,
                                backgroundColor : "#F23847",
                            }}>
                            <Text style={{
                                ...styles.fontMedium,
                                textAlign:"center",
                                color:"white"
                            }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    configDialogInput : {
        flex :1,
        marginBottom:15,
        backgroundColor : "#232323",
        borderRadius : 20
    },

    fontLarge: {
        fontFamily : "Poppins-Regular",
        fontSize: 24,
    },
    fontLargeMedium : {
        fontFamily : "Poppins-Regular",
        fontSize: 19,
    },
    fontMedium : {
        fontFamily : "Poppins-Regular",
        fontSize: 16,
    },
    fontSmall : {
        fontFamily : "Poppins-Regular",
        fontSize: 12,
    },
    fontNormal : {
        fontFamily : "Poppins-Regular",
        fontSize: 14,
    }
});
export  default TherapyConfigDialog;

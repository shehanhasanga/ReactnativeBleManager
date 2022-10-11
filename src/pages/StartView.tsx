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

interface StartViewProps extends WithTheme {
    navigation: any;
};
const StartView: FC= ({ theme,navigation}) => {
    console.log(theme)
    const dispatch = useDispatch();
    const [connectedDeviceId, setConnectedDeviceId] = useState<string>();

    const connectedDevices = useSelector(
        (state: RootState) => state.bluetooth.connectedDeviceList,
    );

    useEffect(() => {
        if(connectedDeviceId){
            if(connectedDevices.length > 0){
                const isDuplicate = connectedDevices.some(
                    device => device.id === connectedDeviceId,
                );
                if(isDuplicate){
                    navigation.navigate('HomeTabsPage', {deviceId: connectedDeviceId});
                }
            }

        }
    } , [connectedDevices])

    const userIdLoaded = useSelector(
        (state: RootState) => state.storage[USERID],
    );

    const deviceId = useSelector(
        (state: RootState) => state.storage[DEVICEID],
    );

    PushNotification.createChannel(
        {
            channelId: "channel-id", // (required)
            channelName: "My channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    const createNotification = () => {
        PushNotification.localNotification({
            channelId: "channel-id",
            autoCancel: true,
            bigText:
                'This is local notification demo in React Native app. Only shown, when expanded.',
            subText: 'Local Notification Demo',
            title: 'Local Notification Title',
            message: 'Expand me to see more',
            vibrate: true,
            vibration: 300,
            playSound: true,
            soundName: 'default',
            actions: '["Yes", "No"]'
        })
    }

    // PushNotification.localNotification({
    //     /* Android Only Properties */
    //     channelId: "channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
    //     ticker: "My Notification Ticker", // (optional)
    //     showWhen: true, // (optional) default: true
    //     autoCancel: true, // (optional) default: true
    //     largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    //     largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    //     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    //     bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
    //     subText: "This is a subText", // (optional) default: none
    //     bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    //     bigLargeIcon: "ic_launcher", // (optional) default: undefined
    //     bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
    //     color: "red", // (optional) default: system default
    //     vibrate: true, // (optional) default: true
    //     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    //     tag: "some_tag", // (optional) add tag to message
    //     group: "group", // (optional) add group to message
    //     groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    //     ongoing: false, // (optional) set whether this is an "ongoing" notification
    //     priority: "high", // (optional) set notification priority, default: high
    //     visibility: "private", // (optional) set notification visibility, default: private
    //     ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    //     shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    //     onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
    //
    //     when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    //     usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    //     timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    //
    //     messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.
    //
    //     actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
    //     invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    //
    //     /* iOS only properties */
    //     category: "", // (optional) default: empty string
    //     subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
    //
    //     /* iOS and Android properties */
    //     id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    //     title: "My Notification Title", // (optional)
    //     message: "My Notification Message", // (required)
    //     picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
    //     userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    //     playSound: false, // (optional) default: true
    //     soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //     number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    //     repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    // });




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
    // useEffect(() => {
    //     if(usernameloaded){
    //         if(usernameloaded != ''){
    //             console.log(usernameloaded)
    //             navigation.navigate('GrantPermissionPage')
    //         }
    //     }
    // },[usernameloaded])


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

                                    <TouchableOpacity
                                        // onPress={() => {dispatch(setStatusBarColor('#f44336'))}}
                                        onPress={() => {createNotification()}}
                                        style={{
                                        width : width * 0.7,
                                        marginTop : 10,
                                        alignItems:"center",
                                        backgroundColor : theme.palette.success
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Poppins',
                                            fontWeight:"bold"
                                        }}>No oura Ring yet?</Text>
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
// export default StartView;
export default withTheme<StartViewProps>()(StartView);

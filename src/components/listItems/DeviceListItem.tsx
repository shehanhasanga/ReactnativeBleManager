import React, {FC, useEffect, useState} from 'react';
import {BleDevice} from '../../models/Ble/BleDevice';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type DeviceListItemProps = {
  device: BleDevice;
  callback: (id: string, name: string) => void;
};

const DeviceListItem: FC<DeviceListItemProps> = props => {
  const {device, callback} = props;
  const [deviceId, setDeviceId] = useState(device.id);
  useEffect(() => {
      if(device.id.length > 20){
          let deviceIdShort = device.id.substring(0, 20) + "..."
          setDeviceId(deviceIdShort)
      }
  }, [])
  const name: string = device.name ? device.name : 'UnKnown'
  return (
    <TouchableOpacity style={{
        marginTop : 10
    }} onPress={() => callback(device.id, name)}>
        <View style={{
            display : "flex",
            flexDirection : "row",
            alignItems : "center",
            backgroundColor : "#232323",
            paddingLeft : 10,
            paddingRight : 20,
            paddingVertical :  18,
            justifyContent : "space-between",
            borderRadius : 20,
            width : "85%",
            alignSelf : "center"
        }}>
            <View style={ {
                display : "flex",
                flexDirection : "row",
                alignItems : "center",
            }}>
                {/*<Image*/}
                {/*    style={{*/}
                {/*        height : 30,*/}
                {/*        width : 30,*/}
                {/*    }}*/}
                {/*    source={require("../../assets/images/sprynglogo.png")}*/}
                {/*/>*/}
                <View
                    style={{
                        marginLeft : 20

                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight : "bold",
                            color: 'rgba(255,255,255, 0.5)',
                        }}>
                        {name}
                    </Text>
                    <View
                        style={{
                            height :5
                        }}
                    ></View>
                    <Text style={{
                        fontSize : 12,
                        color : "white"
                    }}>{deviceId}</Text>
                </View>
            </View>
            <Icon name="arrow-right" color="white"  size={30} />

        </View>

    </TouchableOpacity>
  );
};
export default DeviceListItem;

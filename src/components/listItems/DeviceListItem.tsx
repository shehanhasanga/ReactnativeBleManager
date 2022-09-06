import React, {FC} from 'react';
import {BleDevice} from '../../models/Ble/BleDevice';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type DeviceListItemProps = {
  device: BleDevice;
  callback: (id: string, name: string) => void;
};

const DeviceListItem: FC<DeviceListItemProps> = props => {
  const {device, callback} = props;
  const name: string = device.name ? device.name : 'UnKnown'
  return (
    <TouchableOpacity style={{
        marginTop : 10
    }} onPress={() => callback(device.id, name)}>
        <View style={{
            display : "flex",
            flexDirection : "row",
            alignItems : "center",
            backgroundColor : "#222427",
            paddingHorizontal:20,
            paddingVertical :  10,
            justifyContent : "space-between",
            borderRadius : 10
        }}>
            <View style={ {
                display : "flex",
                flexDirection : "row",
                alignItems : "center",
            }}>
                <Image
                    style={{
                        height : 30,
                        width : 30,
                    }}
                    source={require("../../assets/images/sprynglogo.png")}
                />
                <View
                    style={{
                        marginLeft : 20

                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#FFFFFF',
                        }}>
                        {name}
                    </Text>
                    <Text style={{
                        fontSize : 14
                    }}>{device.id}</Text>
                </View>
            </View>
            <Icon name="chevron-right" color="white"  size={24} />

        </View>

    </TouchableOpacity>
  );
};
export default DeviceListItem;

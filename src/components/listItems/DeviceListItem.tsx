import React, {FC} from 'react';
import {BleDevice} from '../../models/Ble/BleDevice';
import {Text, TouchableOpacity, View} from 'react-native';

type DeviceListItemProps = {
  device: BleDevice;
  callback: (id: string, name: string) => void;
};

const DeviceListItem: FC<DeviceListItemProps> = props => {
  const {device, callback} = props;
  const name: string = device.name ? device.name : 'UnKnown'
  return (
    <TouchableOpacity onPress={() => callback(device.id, name)}>
      <View
        style={{
          backgroundColor: '#5a5030',
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF',
          }}>
          {name}
        </Text>
        <Text>{device.id}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default DeviceListItem;

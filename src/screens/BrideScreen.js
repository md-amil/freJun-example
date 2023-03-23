import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import Toaster from '../CustomModule';
export default function BrideScreen() {
  const [deviceId, setDeviceId] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="show toast"
        onPress={() => {
          Toaster.showToast(
            'hello this is running from android through bridge',
          );
        }}
      />
      <Button
        title="Get Device Id"
        onPress={async () => {
          const id = await Toaster.getDeviceId();
          setDeviceId(id);
        }}
      />

      <Text>{deviceId}</Text>
    </View>
  );
}

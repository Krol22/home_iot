import React from 'react';
import { useColorScheme } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { Colors, } from 'react-native/Libraries/NewAppScreen';

import Devices from "../components/Devices";

import { 
  ScrollView,
} from 'react-native';

export default function Main() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <NativeBaseProvider>
        <Devices />
      </NativeBaseProvider>
    </ScrollView>
  );
}

import React from 'react';
import { NativeBaseProvider } from "native-base";

import Devices from "../components/Devices";

import { 
  ScrollView,
} from 'react-native';

export default function Main() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <NativeBaseProvider>
        <Devices />
      </NativeBaseProvider>
    </ScrollView>
  );
}

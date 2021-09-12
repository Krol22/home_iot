import React, { useState, useCallback, useMemo } from 'react';
import { Flex, Box, Heading, HStack, Switch } from 'native-base';
import throttle from 'lodash.throttle';
import { useColorScheme, View, ScrollView } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ColorPicker, toHsv } from 'react-native-color-picker';

import { useSelector, useDispatch } from 'react-redux';
import { changeLedColor, offDevice, onDevice } from "../features/deviceSlice";

function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

export default function Device({ deviceName }) {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();

  const device = useSelector((state) => {
    return state.deviceSlice.devices.find(({ name }) => deviceName === name);
  });

  const { h, s, v } = toHsv(device.animation.color);

  const [hue, setHue] = useState(h);
  const [sat, setSat] = useState(s);
  const [val, setVal] = useState(v);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const change = (rgb) => {
    dispatch(changeLedColor({ deviceName, color: rgb })); 
  };

  const func = useMemo(() => 
    throttle(change, 500),
  []);

  const onToggle = useCallback(() => {
    if (device.on) {
      dispatch(offDevice(deviceName));
    } else {
      dispatch(onDevice(deviceName));
    }
  });

  const onColorChange = useCallback(({ h, s, v }) => {
    const rgb = HSVtoRGB(h / 360, s, v);  
    setHue(h);
    setSat(s);
    setVal(v);

    func(rgb);
  }, []);

  return (
    <View
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <NativeBaseProvider>
        <Flex m={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading>{device.display}</Heading>
            <Switch isChecked={!!device.on} onToggle={onToggle}/>
          </HStack>
          {device.on ? (
            <ColorPicker color={{ h: hue, s: sat, v: val }} style={{ height: 500 }} onColorChange={onColorChange}/>
          ) : null}
        </Flex>
      </NativeBaseProvider>
    </View>
  );
}

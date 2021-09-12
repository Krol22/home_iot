import React, { useEffect, useCallback } from "react";
import {
  Box,
  VStack,
  Flex,
  Heading,
  Button,
  HStack,
} from "native-base"
import { Actions } from "react-native-router-flux";

import { useDispatch, useSelector } from "react-redux";

import { getAllDevices, offDevice, onDevice } from "../features/deviceSlice";

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex({ r, g, b }) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export default function Devices() {
  const dispatch = useDispatch();
  const devices = useSelector((state) => {
    return state.deviceSlice.devices;
  });

  useEffect(() => {
    console.log("GET ALL");
    dispatch(getAllDevices());
  }, []);

  const turnOnDevice = useCallback((name) => {
    dispatch(onDevice(name))
  }, []);

  const turnOffDevice = useCallback((name) => {
    dispatch(offDevice(name))
  }, []);

  const goToDevice = useCallback((deviceName, displayName) => {
    Actions.push("device", { deviceName, title: displayName });
  })

  return (
    <Flex justify="center" align="center" ml={4} mr={4}>
      <Heading alignSelf="flex-start" mt={6} mb={6}>Urządzenia :</Heading>
      <VStack space={3} w="100%">
        {devices.map(({ display, on, name }) => (
          <Box key={display} border="1px solid black" w="100%" h="120px" padding={2}>
            <VStack justifyContent="space-between" h="100%" alignItems="flex-start" w="100%">
              <HStack alignItems="center" justifyContent="space-between" w="100%">
                <Heading size="md">
                  {display}
                </Heading>
                <Box>
                  {on ? (
                    <Button onPress={() => turnOffDevice(name)} colorScheme="danger" _text={{ color: "white" }}>Wyłącz</Button>
                  ) : (
                    <Button onPress={() => turnOnDevice(name)} colorScheme="teal" _text={{ color: "white" }}>Włącz</Button>
                  )}
                </Box>
              </HStack>
              <Button
                onPress={() => goToDevice(name, display)}
                variant="link"
                _text={{ color: "black" }}
                p="0"
                mb="2"
              >
                Ustawienia
              </Button>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Flex> 
  );
}

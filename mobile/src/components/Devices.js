import React, { useEffect, useCallback } from "react";
import {
  Box,
  VStack,
  Flex,
  Heading,
  Button,
  Switch,
  HStack,
  ScrollView,
  Container,
} from "native-base"
import { RefreshControl } from "react-native"
import { Actions } from "react-native-router-flux";

import { useDispatch, useSelector } from "react-redux";

import {
  getDevices,
  offDevice,
  onDevice,
} from "../features/deviceSlice";

export default function Devices() {
  const dispatch = useDispatch();
  const devices = useSelector((state) => {
    return state.deviceSlice.devices;
  });

  const isLoading = useSelector((state) => {
    return state.deviceSlice.isLoading;
  });

  const rooms = useSelector((state) => {
    return state.deviceSlice.rooms;
  });

  useEffect(() => {
    dispatch(getDevices());
  }, []);

  const onRefresh = () => {
    console.log("test123");
    dispatch(getDevices());
  };

  const onToggle = useCallback((deviceName) => {
    const device = devices.find(({ name }) => name === deviceName);

    if (device.on) {
      dispatch(offDevice(deviceName));
    } else {
      dispatch(onDevice(deviceName));
    }
  });

  const renderRoom = ({ display, name, devices: roomDevices }, dispatch) => {
    const devicesToRender = devices.filter(({ name }) => roomDevices.indexOf(name) > -1);
    const isToggleOn = devicesToRender.some(({ on }) => on);

    const onRoomToggle = () => {
      if (isToggleOn) {
        devicesToRender.forEach(({ name }) => dispatch(offDevice(name)));
      } else {
        devicesToRender.forEach(({ name }) => dispatch(onDevice(name)));
      }
    };

    const leftColumn = devicesToRender.filter((_, index) => index % 2 === 0);
    const rightColumn = devicesToRender.filter((_, index) => index % 2);

    return (
      <>
        <HStack alignItems="center" justifyContent="space-between" w="100%">
          <Heading mt={5} mb={3}>{display}</Heading>
          <Switch isChecked={isToggleOn} onToggle={() => onRoomToggle(name)}/>
        </HStack>
        <HStack>
          <VStack w="50%">
            {leftColumn.map(({ display, on, name }) => (
              <Box key={display} border="1px solid black" w="100%" h="120px" padding={2}>
                <VStack justifyContent="space-between" h="100%" alignItems="flex-start" w="100%">
                  <HStack alignItems="center" justifyContent="space-between" w="100%">
                    <Heading size="md">
                      {display}
                    </Heading>
                    <Box>
                      <Switch isChecked={!!on} onToggle={() => onToggle(name)} />
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
          <VStack w="50%">
            {rightColumn.map(({ display, on, name }) => (
              <Box key={display} border="1px solid black" w="100%" h="120px" padding={2}>
                <VStack justifyContent="space-between" h="100%" alignItems="flex-start" w="100%">
                  <HStack alignItems="center" justifyContent="space-between" w="100%">
                    <Heading size="md">
                      {display}
                    </Heading>
                    <Box>
                      <Switch isChecked={!!on} onToggle={() => onToggle(name)} />
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
        </HStack>
      </>
    )
  };

  const goToDevice = useCallback((deviceName, displayName) => {
    Actions.push("device", { deviceName, title: displayName });
  });

  return (
    <Container>
      <ScrollView refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        <Flex justify="center" align="center" ml={4} mr={4}>
          <Heading alignSelf="flex-start" mt={6} mb={6}>Urządzenia :</Heading>
          <VStack space={3} w="100%">
            {rooms.map(room => renderRoom(room, dispatch))}
          </VStack>
        </Flex> 
      </ScrollView>
    </Container>
  );
}

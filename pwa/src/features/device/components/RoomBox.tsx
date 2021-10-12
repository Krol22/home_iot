import styled from 'styled-components';
import { Device } from '../../../types';

import ToggleBox from '../../../components/ToggleBox';

type RoomBoxProps = {
  display: string,
  name: string,
  devices: string[],
  allDevices: Device[],
  toggleRoom: (payload: { roomName: string, value: boolean }) => any,
}

export default function RoomBox({ display, name, devices, allDevices, toggleRoom }: RoomBoxProps) {
  const roomDevices = allDevices.filter(({ name }) => devices.find(deviceName => deviceName === name));
  const roomOn = roomDevices.some(({ on }) => on);

  const onSwitchChange = (value: boolean) => {
    toggleRoom({ roomName: name, value })
  };

  const onBoxClick = () => {};

  return (
    <ToggleBox
      name={display}
      on={roomOn}
      onSwitchChange={onSwitchChange}
      onBoxClick={onBoxClick}
    />
  );
}

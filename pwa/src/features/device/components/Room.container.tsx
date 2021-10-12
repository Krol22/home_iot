import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import {
  toggleDevice as toggleDeviceAction,
  toggleRoom as toggleRoomAction,
} from '../deviceSlice';

import Room from './Room';

type RoomContainerProps = {
  name: string,
  display: string,
  devices: string[],
};

export default function RoomContainer(props: RoomContainerProps) {
  const dispatch = useDispatch();

  const { devices: allDevices } = useSelector((state: AppState) => state.device);

  const toggleDevice = (payload: { deviceName: string, value: boolean }) => dispatch(toggleDeviceAction(payload));
  const toggleRoom = (payload: { roomName: string, value: boolean }) => dispatch(toggleRoomAction(payload));

  console.log(toggleDevice);

  return (
    <Room
      {...props}
      allDevices={allDevices}
      toggleDevice={toggleDevice}
      toggleRoom={toggleRoom}
    />
  );
}


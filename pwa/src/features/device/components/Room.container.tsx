import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { toggleDevice as toggleDeviceAction } from '../deviceSlice';

import Room from './Room';

type RoomContainerProps = {
  display: string,
  devices: string[],
};

export default function RoomContainer(props: RoomContainerProps) {
  const dispatch = useDispatch();

  const { devices: allDevices } = useSelector((state: AppState) => state.device);

  const toggleDevice = (payload: { deviceName: string, value: boolean }) => dispatch(toggleDeviceAction(payload));

  console.log(toggleDevice);

  return (
    <Room
      {...props}
      allDevices={allDevices}
      toggleDevice={toggleDevice}
    />
  );
}


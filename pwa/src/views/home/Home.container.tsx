import { useDispatch, useSelector } from 'react-redux';
import {AppState} from '../../store';

import { toggleRoom as toggleRoomAction } from '../../features/device/deviceSlice';

import Home from './Home';

export default function HomeContainer() {
  const dispatch = useDispatch();

  const { devices, rooms } = useSelector((state: AppState) => state.device);

  const toggleRoom = (payload: { roomName: string, value: boolean }) => dispatch(toggleRoomAction(payload));

  return (
    <Home devices={devices} rooms={rooms} toggleRoom={toggleRoom} />
  );
}

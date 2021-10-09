import { useDispatch, useSelector } from 'react-redux';

import { fetchFirebaseState as fetchFirebaseStateAction } from '../deviceSlice';
import { AppState } from '../../../store';

import Rooms from './Rooms';

export default function RoomsContainer() {
  const dispatch = useDispatch();

  const { isLoading, rooms, devices } = useSelector((state: AppState) => state.device);

  const fetchFirebaseState = () => dispatch(fetchFirebaseStateAction());

  return (
    <Rooms
      isLoading={isLoading}
      rooms={rooms}
      devices={devices}
      fetchFirebaseState={fetchFirebaseState}
    />
  )
}


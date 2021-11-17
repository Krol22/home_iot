import { useEffect } from 'react';

import { Room as RoomType, Device } from '../../../types';
import Room from './Room.container';

type RoomsProps = {
  isLoading: boolean,
  rooms: RoomType[],
  devices: Device[],
  fetchFirebaseState: () => any,
};

export default function Rooms({
  isLoading,
  rooms,
  devices,
  fetchFirebaseState,
}: RoomsProps) {

  useEffect(() => {
    fetchFirebaseState();
  }, []);

  if (isLoading) {
    return (
      <h1>loading</h1>  
    );
  }

  return (
    <div>
      {rooms.map(room => <Room key={room.name} {...room} />)}
    </div>
  )
}

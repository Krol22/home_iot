import styled from 'styled-components';

import { Device, Room } from '../../types';
import RoomBox from '../../features/device/components/RoomBox';

type HomeViewProps = {
  devices: Device[],
  rooms: Room[],
  toggleRoom: (payload: { roomName: string, value: boolean }) => any,
};

const StyledHome = styled.div`
  h1 {
    margin: 64px 0 64px;
    font-size: 48px;
  }

  .rooms-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

export default function HomeView ({ rooms, devices, toggleRoom }: HomeViewProps) {
  return (
    <StyledHome>
      <h1>Domek</h1>
      <div className="rooms-grid">
        {rooms.map(room => (
          <RoomBox key={room.name} {...room} allDevices={devices} toggleRoom={toggleRoom} />
        ))}
      </div>
    </StyledHome>
  );
};

import styled from 'styled-components';

import Switch from '../../../components/Switch';
import { Device } from '../../../types';

type RoomProps = {
  name: string,
  display: string,
  devices: string[],
  allDevices: Device[],
  toggleDevice: (payload: { deviceName: string, value: boolean }) => any;
  toggleRoom: (payload: { roomName: string, value: boolean }) => any;
};

const StyledRoom = styled.div`
  .room-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 36px 0 24px;
    padding: 0 16px;
  }

  h2 {
    font-size: 32px;
    font-weight: bold;
    color: white;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  li {
    padding: 16px;
    background-color: #00ddaa;
    border: 4px solid black;
    min-height: 100px;

    .device-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  h3 {
    font-size: 16px;
  }
`;

export default function Room({ name, display, devices, allDevices, toggleDevice, toggleRoom }: RoomProps) {
  const roomDevices = allDevices.filter(({ name }) => devices.find(deviceName => deviceName === name));
  const roomOn = roomDevices.some(({ on }) => on);

  return (
    <StyledRoom>
      <div className="room-header">
        <h2>{display}</h2>
        <Switch value={roomOn} onChange={(value) => {
          toggleRoom({ roomName: name, value });
        }}/>
      </div>
      <ul>
        {roomDevices.map(({ display, name, on }) => (
          <li key={name}>
            <div className="device-header">
              <h3>{display}</h3>
              <Switch
                value={on}
                onChange={(value) => {
                  toggleDevice({ deviceName: name, value });
                }}
              />
            </div>
          </li>  
        ))}
      </ul>
    </StyledRoom>
  );
}

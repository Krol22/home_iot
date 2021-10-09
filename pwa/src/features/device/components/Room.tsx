import styled from 'styled-components';

import Switch from '../../../components/Switch';
import { Device } from '../../../types';

type RoomProps = {
  display: string,
  devices: string[],
  allDevices: Device[],
  toggleDevice: (payload: { deviceName: string, value: boolean }) => any;
};

const StyledRoom = styled.div`
  h2 {
    margin: 16px 0;
    font-size: 32px;
    font-weight: bold;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  li {
    padding: 16px;
    background-color: #daffef;
    border-radius: 10px;
    min-height: 100px;
  }

  h3 {
    font-size: 20px;
  }
`;

export default function Room({ display, devices, allDevices, toggleDevice }: RoomProps) {
  const roomDevices = allDevices.filter(({ name }) => devices.find(deviceName => deviceName === name));

  return (
    <StyledRoom>
      <h2>{display}</h2>
      <ul>
        {roomDevices.map(({ display, name, on, current_animation }) => (
          <li key={name}>
            <h3>{display}</h3>
            <Switch
              value={on}
              onChange={(value) => {
                toggleDevice({ deviceName: name, value });
              }}
            />
          </li>  
        ))}
      </ul>
    </StyledRoom>
  );
}

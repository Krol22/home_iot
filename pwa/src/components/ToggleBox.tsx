import styled from 'styled-components';

import Switch from './Switch';

type ToggleBoxProps = {
  name: string,
  on: boolean,
  onSwitchChange: (newValue: boolean) => void,
  onBoxClick: () => void,
};

const StyledToggleBox = styled.div`
  padding: 16px;
  border: 2px solid white;
  border-radius: 22px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(42px);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h3 {
    font-size: 16px;
    margin-top: 24px;
    font-weight: bold;
  }
`;

export default function ToggleBox({
  name,
  on,
  onSwitchChange,
  onBoxClick,
}: ToggleBoxProps) {
  return (
    <StyledToggleBox onClick={onBoxClick}>
      <div className="header">
        <span>
          {on ? ("On") : ("Off")}
        </span>
        <Switch value={on} onChange={onSwitchChange} />
      </div>
      <h3>{name}</h3>
    </StyledToggleBox>
  )    
}

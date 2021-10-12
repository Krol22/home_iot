import { SyntheticEvent } from 'react';
import styled from 'styled-components';

type SwitchProps = {
  onChange: (value: boolean) => void;
  value: boolean;
}

type StyledSwitchProps = {
  active: boolean;
};

const StyledSwitch = styled.div<StyledSwitchProps>`
  display: inline-block;
  position: relative;
  width: 45px;
  height: 25px;
  background-color: grey;
  cursor: pointer;
  transition: background-color; .2s ease-in-out;
  border-radius: 13px;

  .knob {
    box-sizing: border-box;
    position: absolute;
    background-color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;

    top: 50%;
    left: 4px;
    transform: translateY(-50%);

    transition: left .2s ease-in-out;
  }

  ${({ active }) => `
    ${active && `
      background-color: #129FC1;

      .knob {
        left: calc(100% - 24px);
      }
      `}
  `}
`;

export default function Switch({ onChange, value }: SwitchProps) {
  const handleOnClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    onChange(!value);
  }
  return (
    <StyledSwitch active={!!value} onClick={handleOnClick}>
      <div className="knob" />
    </StyledSwitch>
  )
};

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
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: #5d737e;

  .knob {
    position: absolute;
    border-radius: 50%;
    background-color: #fcfffd;
    width: 16px;
    height: 16px;

    top: 50%;
    left: 2px;
    transform: translateY(-50%);

    transition: left .2s ease-in-out;
  }

  ${({ active }) => `
    ${active && `
      .knob {
        left: initial;
        right: 2px;
      }
      `}
  `}
`;

export default function Switch({ onChange, value }: SwitchProps) {
  return (
    <StyledSwitch active={!!value} onClick={() => onChange(!value)}>
      <div className="knob" />
    </StyledSwitch>
  )
};

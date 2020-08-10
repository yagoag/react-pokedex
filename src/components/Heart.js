import styled from 'styled-components';

const Heart = styled.div`
  margin: ${`${0.5 * 16}px`} auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #141414;
  border: none;
  height: 16px;
  width: 16px;
  transform: rotate(-45deg);
  cursor: pointer;
  opacity: ${(props) => (props.inactive ? '0.3' : '1')};

  &:hover {
    opacity: ${(props) => (props.inactive ? '0.5' : '0.85')};
  }

  &:after {
    background-color: #141414;
    content: '';
    border-radius: 50%;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0px;
    left: ${`${0.5 * 16}px`};
  }

  &:before {
    content: '';
    background-color: #141414;
    border-radius: 50%;
    position: absolute;
    width: 16px;
    height: 16px;
    top: ${`${-0.5 * 16}px`};
    left: 0px;
  }
`;

export default Heart;

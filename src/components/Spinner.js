import styled, { css } from 'styled-components';

const Spinner = styled.div`
  ${(props) =>
    props.size === 'small'
      ? css`
          width: 16px;
          height: 16px;
          border-radius: 22px;
          border: 6px solid #141414;
        `
      : css`
          width: 24px;
          height: 24px;
          border-radius: 32px;
          border: 8px solid #141414;
        `}

  border-bottom-color: transparent;
  animation: spin ease 1s infinite;
  margin: 16px auto;

  @keyframes spin {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;

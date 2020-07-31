import styled from 'styled-components';

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 32px;
  border: 8px solid #141414;
  border-bottom: 8px solid transparent;
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

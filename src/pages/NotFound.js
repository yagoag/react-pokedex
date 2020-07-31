import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Message = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fefefe;
`;

const NotFound = () => (
  <Message>
    Looks like the Pokeball you found is empty... Try going back to the{' '}
    <Link to="/">main page</Link>.
  </Message>
);

export default NotFound;

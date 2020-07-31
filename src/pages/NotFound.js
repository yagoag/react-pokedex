import React from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const NotFound = () => (
  <ErrorMessage>
    Looks like the Pokeball you found is empty...
    <br />
    Try going back to the <Link to="/">main page</Link>.
  </ErrorMessage>
);

export default NotFound;

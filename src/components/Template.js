import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 760px;
  align-self: center;
  margin: 0 auto;
`;

const Header = styled.header`
  background-color: #e02121;
`;

const Content = styled.main`
  background-color: #9b1818;
  padding: 24px;
  border: 2px solid #141414;
  border-top: none;
  border-radius: 0 0 8px 8px;
`;

const Template = ({ children }) => (
  <Container>
    <Header />
    <Content>{children}</Content>
  </Container>
);

export default Template;

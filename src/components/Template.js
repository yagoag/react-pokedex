import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Search from './Search';

const Container = styled.div`
  max-width: 760px;
  align-self: center;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  border: 2px solid #141414;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  margin: 8px 8px 0 8px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const LensContainer = styled.div`
  background-color: #e02121;
  border-top-left-radius: 6px;
  display: inline-flex;
  height: 115px;

  @media (min-width: 551px) {
    &::after {
      content: '';
      display: block;
      margin-left: -32px;
      margin-bottom: -32px;
      margin-right: -32px;
      margin-top: calc(115px - 32px);
      width: 0;
      height: 0;
      border: 16px solid transparent;
      border-top-color: #e02121;
      border-left-color: #e02121;
    }
  }
`;

const CameraLens = styled.div`
  width: 64px;
  height: 64px;
  border: 2px solid #141414;
  border-radius: 32px;
  background-color: #2d93bf;
  box-sizing: border-box;
  box-shadow: 0 0 0 8px #afafae, 0 0 0 10px #141414;
  margin: 24px 24px 24px 36px;

  &::before {
    content: '';
    position: absolute;
    margin: 12px 0 0 12px;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #ffffff66;
  }
`;

export const HeaderButton = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #141414;
  border-radius: 12px;
  background-color: ${(props) =>
    ({
      [props.color]: '#aa1e1e',
      yellow: '#c9b412',
      green: '#2eaf1f',
    }[props.color])};
  box-sizing: border-box;
  margin: 22px 4px;

  &:last-child {
    margin-right: 36px;
  }

  &::before {
    content: '';
    position: absolute;
    margin: 3px 0 0 3px;
    width: 4px;
    height: 4px;
    border-radius: 3px;
    background-color: #ffffff66;
  }
`;

const SearchContainer = styled.div`
  height: calc(115px - 32px);
  background-color: #e02121;
  flex: 1;
  padding-left: 48px;
  display: flex;
  align-items: center;
  border-top-right-radius: 6px;

  @media (max-width: 600px) {
    border-top-right-radius: 0;
    justify-content: center;
    padding: 0 0 24px 0;
  }
`;

const Content = styled.main`
  background-color: #9b1818;
  margin: -32px 8px 8px 8px;
  padding: 56px 24px 24px 24px;
  border: 2px solid #141414;
  border-top: none;
  border-radius: 0 0 8px 8px;
`;

const Template = ({ children }) => (
  <Container>
    <Header>
      <LensContainer>
        <Link to="/">
          <CameraLens />
        </Link>
        <HeaderButton color="red" />
        <HeaderButton color="yellow" />
        <HeaderButton color="green" />
      </LensContainer>
      <SearchContainer>
        <Search />
      </SearchContainer>
    </Header>
    <Content>{children}</Content>
  </Container>
);

export default Template;

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #afafae;
  border-radius: 4px;
  padding: 0 16px 16px 16px;
  width: min-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '${(props) => props.number}';
    display: block;
    position: absolute;
    background-color: #e02121;
    color: #141414;
    font-weight: 600;
    font-size: 12px;
    min-width: 1.2rem;
    margin: 6px 0 0 -10px;
    text-align: center;
    border: 2px solid #141414;
    border-radius: 50vh;
    box-sizing: border-box;
    align-self: flex-start;
  }

  &::after {
    content: '';
    display: block;
    margin-left: -18px;
    margin-bottom: -18px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left-color: white;
    border-bottom-color: white;
    align-self: flex-start;
  }
`;

const TopButtons = styled.div`
  display: inline-flex;
  align-self: center;

  &::before,
  &::after {
    content: '';
    display: block;
    background-color: #e02121;
    width: 6px;
    height: 6px;
    border: 1px solid #141414;
    border-radius: 3px;
    box-sizing: border-box;
    margin: 4px;
  }
`;

const Picture = styled.img`
  width: 96px;
  height: 72px;
  object-fit: cover;
  background-color: #2d2d2d;
  border: 2px solid #141414;
  border-radius: 4px;
`;

const Name = styled.div`
  text-align: center;
  text-transform: capitalize;
  margin: 4px 0 -4px 0;
`;

const PokeCard = ({ number, name }) => (
  <Container number={number}>
    <TopButtons />
    <Picture
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}
      alt={`front sprite of ${name}`}
    />
    <Name>{name}</Name>
  </Container>
);

export default PokeCard;

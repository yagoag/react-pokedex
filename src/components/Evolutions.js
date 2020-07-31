import React, { useState, useEffect, Fragment } from 'react';
import { getPokemonSpecies, getFromApi } from '../api';
import styled from 'styled-components';
import { HeaderButton } from './Template';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: inline-flex;
  color: #fefefe;
`;

const StagesContainer = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
`;

const Stage = styled.div`
  background-color: #2d2d2d;
  border: 2px solid #141414;
  border-radius: 4px;
  color: #fefefe;
  padding: 12px 16px;
  font-weight: 600;
  text-transform: capitalize;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  background: none;
  border: 8px solid transparent;
  border-left: 8px solid #141414;
  border-right: none;
  margin: 0 12px;
  transform: scaleX(2);
`;

const Evolutions = ({ number }) => {
  const [evolutionChain, setEvolutionChain] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const evolutionChainUrl = (await getPokemonSpecies(number)).body
          .evolution_chain.url;
        const data = (await getFromApi(evolutionChainUrl, false)).body;

        const chain = [];
        let cur = data.chain;
        let hasNext = true;
        do {
          chain.push(cur.species.name);
          if (cur.evolves_to.length) {
            cur = cur.evolves_to[0];
          } else {
            hasNext = false;
          }
        } while (hasNext);

        setEvolutionChain(chain);
      } catch (e) {
        setError(
          'We had a problem reaching the server. Please try again in a few moments.'
        );
      }

      setLoading(false);
    })();
  }, [number]);

  if (!evolutionChain || loading) return <Spinner />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <>
      <Title>
        <HeaderButton color="yellow" style={{ margin: '0 6px 0 0' }} />{' '}
        Evolutions
      </Title>
      <StagesContainer>
        {evolutionChain.map((stage, index) => (
          <Fragment key={index}>
            <Stage>{stage}</Stage>
            {index !== evolutionChain.length - 1 && <Arrow />}
          </Fragment>
        ))}
      </StagesContainer>
    </>
  );
};

export default Evolutions;

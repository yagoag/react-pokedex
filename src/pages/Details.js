import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../api';
import PokeCard from '../components/PokeCard';
import styled from 'styled-components';
import Evolutions from '../components/Evolutions';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-gap: 2px;
  background-color: #141414;
  border-radius: 4px;
  padding: 2px;
  margin-bottom: 16px;
`;

const Overview = styled.div`
  background-color: #2d2d2d;
  border: 2px solid #141414;
  border-radius: 4px;
  color: #fefefe;
  margin-bottom: 24px;
  padding: 12px 16px;
  font-weight: 600;
  text-transform: capitalize;

  > div:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Stat = styled.div`
  background-color: #2d93bf;
  text-transform: capitalize;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 600;
`;

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setData((await getPokemonDetails(id)).body);
      setLoading(false);
    })();
  }, [id]);

  if (loading || !data) return <div>Loading...</div>;

  return (
    <Container>
      <PokeCard number={id} name={data.name} />
      <div>
        <Overview>
          <div>Height: {(data.height / 10).toFixed(1)}m</div>
          <div>
            Type{data.types.length > 1 && 's'}:{' '}
            {data.types.map((type) => type.type.name).join(', ')}
          </div>
        </Overview>
        <Grid>
          {data.stats.map((stat, index) => (
            <Stat key={index}>
              <div>{stat.stat.name.replace('-', ' ')}</div>
              <div>{stat.base_stat}</div>
            </Stat>
          ))}
        </Grid>
        <Evolutions number={id} />
      </div>
    </Container>
  );
};

export default Details;

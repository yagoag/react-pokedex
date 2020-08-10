import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../api';
import PokeCard from '../components/PokeCard';
import styled from 'styled-components';
import Evolutions from '../components/Evolutions';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
import Heart from '../components/Heart';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 550px) {
    flex-direction: column;
    align-content: center;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const HeartContainer = styled.div`
  border: 2px solid #141414;
  background-color: #2eaf1f;
  border-radius: 4px;
  margin-top: 16px;
  padding: 8px;
`;

const FavoriteMessage = styled.div`
  color: #141414;
  width: 110px;
  text-align: center;
  margin-top: ${(props) => props.hasMessage && '12px'};
  height: ${(props) => (props.hasMessage ? '2.2rem' : 0)};
  opacity: ${(props) => (props.hasMessage ? 1 : 0)};
  transition-property: height, margin, opacity;
  transition-duration: 400ms;
  transition-timing-function: ease-in-out;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

  @media (max-width: 550px) {
    margin-top: 16px;
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
  const [savedMessage, setSavedMessage] = useState(null);
  const [isFavorite, setIsFavorite] = useState({
    value: false,
    changed: false,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setData((await getPokemonDetails(id)).body);
      } catch (e) {
        setData({ error: 'Pokémon not found.' });
      }
      setLoading(false);

      if (id) {
        const savedToStore = localStorage.getItem('favorite_pokemons');
        setIsFavorite({
          value:
            savedToStore &&
            JSON.parse(savedToStore).find((pokemon) => pokemon.id === id),
          changed: false,
        });
      }
    })();
  }, [id]);

  useEffect(() => {
    if (isFavorite.changed) {
      setSavedMessage(
        isFavorite.value ? 'Saved to favorites' : 'Removed from favorites'
      );
      const clearMessage = setTimeout(() => setSavedMessage(null), 5000);

      return () => clearTimeout(clearMessage);
    }
  }, [isFavorite]);

  const toggleFavorite = () => {
    const { name } = data;
    const savedToStore = localStorage.getItem('favorite_pokemons');
    const previouslySaved = savedToStore ? JSON.parse(savedToStore) : [];
    const wasSaved = previouslySaved.find((pokemon) => pokemon.id === id);

    if (!wasSaved) {
      previouslySaved.push({ id, name });
      localStorage.setItem(
        'favorite_pokemons',
        JSON.stringify(previouslySaved)
      );
      setIsFavorite({ value: true, changed: true });
    } else {
      const filteredFavorites = previouslySaved.filter(
        (pokemon) => pokemon.id !== id
      );
      localStorage.setItem(
        'favorite_pokemons',
        JSON.stringify(filteredFavorites)
      );
      setIsFavorite({ value: false, changed: true });
    }
  };

  if (loading || !data) return <Spinner />;
  if (data.error) return <ErrorMessage>{data.error}</ErrorMessage>;

  return (
    <Container>
      <Sidebar>
        <PokeCard number={id} name={data.name} />
        <HeartContainer>
          <Heart inactive={!isFavorite.value} onClick={toggleFavorite} />
          <FavoriteMessage hasMessage={!!savedMessage}>
            {savedMessage}
          </FavoriteMessage>
        </HeartContainer>
      </Sidebar>
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
              <div>
                {stat.stat.name.replace('-', ' ').replace(/^hp$/i, 'HP')}
              </div>
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

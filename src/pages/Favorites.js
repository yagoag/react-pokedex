import React, { useEffect, useState } from 'react';
import { PAGE_SIZE } from '../api';
import List from '../components/List';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const savedToStore = localStorage.getItem('favorite_pokemons');
    setFavorites(JSON.parse(savedToStore));
    setLoading(false);
  }, []);

  return (
    <List
      data={{
        results: favorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        count: favorites.length,
      }}
      loading={loading}
      onPageChange={setPage}
    />
  );
};

export default Favorites;

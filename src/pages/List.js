import React, { useEffect, useState } from 'react';
import { getPokemonList, PAGE_SIZE } from '../api';
import PokeCard from '../components/PokeCard';
import styled from 'styled-components';
import Template from '../components/Template';

const getNumberFromUrl = (url) => {
  const splittedUrl = url.split('/');
  const lastIndex = splittedUrl.length - 1;

  return splittedUrl[lastIndex] !== ''
    ? splittedUrl[lastIndex]
    : splittedUrl[lastIndex - 1];
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 24px;
  justify-items: center;
`;

const List = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setData((await getPokemonList(page)).body);
      setLoading(false);
    })();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Houston, we have a problem...</div>;

  return (
    <Template>
      <Grid>
        {data.results.map((res) => {
          const id = getNumberFromUrl(res.url);

          return <PokeCard key={id} number={id} name={res.name} />;
        })}
      </Grid>
      <button
        onClick={() => page > 1 && setPage(page - 1)}
        disabled={page <= 1}
      >
        Previous page
      </button>{' '}
      |{' '}
      <button
        onClick={() =>
          page < Math.ceil(data.count / PAGE_SIZE) && setPage(page + 1)
        }
        disabled={page >= Math.ceil(data.count / PAGE_SIZE)}
      >
        Next page
      </button>
    </Template>
  );
};

export default List;

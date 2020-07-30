import React, { useEffect, useState } from 'react';
import { getPokemonList, PAGE_SIZE } from '../api';

const getNumberFromUrl = (url) => {
  const splittedUrl = url.split('/');
  const lastIndex = splittedUrl.length - 1;

  return splittedUrl[lastIndex] !== ''
    ? splittedUrl[lastIndex]
    : splittedUrl[lastIndex - 1];
};

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
  console.log({ data });

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Houston, we have a problem...</div>;

  return (
    <div>
      {data.results.map((res) => {
        const id = getNumberFromUrl(res.url);

        return (
          <div key={id}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={`front sprite of ${res.name}`}
            />
            <p>
              {id}. {res.name}
            </p>
          </div>
        );
      })}
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
    </div>
  );
};

export default List;

import React, { useEffect, useState } from 'react';
import { getPokemonList } from '../api';
import List from '../components/List';

const ListAll = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setData((await getPokemonList(page)).body);
      } catch (e) {
        setData({
          error:
            'We had a problem reaching the server. Please try again in a few moments.',
        });
      }
      setLoading(false);
    })();
  }, [page]);

  return <List data={data} loading={loading} onPageChange={setPage} />;
};

export default ListAll;

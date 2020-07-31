import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPokemonList, PAGE_SIZE } from '../api';
import PokeCard from '../components/PokeCard';
import { Link } from 'react-router-dom';

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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #2eaf1f;
  width: fit-content;
  padding: 16px 8px;
  border: 2px solid #141414;
  border-radius: 4px;
  margin: 24px auto 0 auto;
`;

const PageButton = styled.button`
  width: 0;
  height: 0;
  background: none;
  border: 12px solid transparent;
  border-left: 12px solid #141414;
  border-right: none;
  margin-left: ${(props) => !props.left && '12px'};
  margin-right: ${(props) => props.left && '12px'};
  transform: scaleX(2) ${(props) => props.left && 'rotate(180deg)'};
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PageCounter = styled.div`
  margin: 0 16px;
  font-size: 14px;
  font-weight: 600;
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
    <>
      <Grid>
        {data.results.map((res) => {
          const id = getNumberFromUrl(res.url);
          return (
            <StyledLink key={id} to={`/details/${id}`}>
              <PokeCard number={id} name={res.name} />
            </StyledLink>
          );
        })}
      </Grid>

      <PaginationContainer>
        <PageButton
          left
          title="Previous page"
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page <= 1}
        />
        <PageCounter>
          Page {page}/{Math.ceil(data.count / PAGE_SIZE)}
        </PageCounter>
        <PageButton
          title="Next page"
          onClick={() =>
            page < Math.ceil(data.count / PAGE_SIZE) && setPage(page + 1)
          }
          disabled={page >= Math.ceil(data.count / PAGE_SIZE)}
        />
      </PaginationContainer>
    </>
  );
};

export default List;

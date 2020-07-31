import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getAllPokemons } from '../api';
import Spinner from './Spinner';
import { getNumberFromUrl } from '../utils';
import { Link } from 'react-router-dom';

const SearchInput = styled.input.attrs({
  type: 'text',
  placeholder: 'Search by number or name',
})`
  width: 240px;
  background-color: #fefefe;
  border: 2px solid #141414;
  border-radius: 4px;
  font-size: 16px;
  padding: 6px 8px;
`;

const SearchResults = styled.div`
  position: absolute;
  margin-top: -2px;
  width: 256px;
  background-color: #fefefe;
  border: 2px solid #141414;
  border-radius: 0 0 4px 4px;
  padding: 6px 0;
  z-index: 999;
`;

const Result = styled.div`
  padding: 8px 12px;
  text-transform: capitalize;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #141414;
  cursor: pointer;

  &:hover {
    background-color: #14141414;
  }
`;

const Search = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searching) {
      (async () => {
        setLoading(true);
        try {
          setData(await getAllPokemons());
        } catch (e) {
          setData({
            error:
              'We had a problem reaching the server. Please try again in a few moments.',
          });
        }
        setLoading(false);
      })();
    }
  }, [searching]);

  const handleSearch = useCallback(
    (e) => {
      if (!searching) {
        setSearching(true);
      }

      if (data) {
        setResults(
          data.results
            .map((res) => ({
              name: res.name.replace(/-/g, ' '),
              number: getNumberFromUrl(res.url),
            }))
            .filter(
              (res) =>
                res.name.toLowerCase().includes(e.target.value) ||
                res.number.toLowerCase().includes(e.target.value)
            )
        );
      }
    },
    [data, searching]
  );

  return (
    <div>
      <SearchInput onChange={handleSearch} onClick={() => setSearching(true)} />
      {searching && (
        <SearchResults>
          {loading ? (
            <Spinner size="small" />
          ) : data?.error ? (
            <Result>{data.error}</Result>
          ) : results.length < 1 ? (
            <Result>No results</Result>
          ) : (
            results.slice(0, 5).map((res) => (
              <StyledLink
                key={res.number}
                to={`/details/${res.number}`}
                onClick={() => setSearching(false)}
              >
                <Result>{res.name}</Result>
              </StyledLink>
            ))
          )}
        </SearchResults>
      )}
    </div>
  );
};

export default Search;

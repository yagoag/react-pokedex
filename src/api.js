const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 10;
const CACHE_TIMEOUT = 30 * 24 * 60 * 60 * 1000; // 30 days to ms

const getFromApi = async (endpoint) => {
  const response = await fetch(
    `${API_BASE_URL}${!endpoint.startsWith('/') ? '/' : ''}${endpoint}`
  );

  if (!response.ok) {
    throw new Error({
      message: `Request to API failed with status ${response.status} (${response.statusText})`,
      response,
    });
  }

  return {
    status: response.status,
    statusText: response.statusText,
    body: await response.json(),
  };
};

export const getPokemonList = (page = 1) =>
  getFromApi(`/pokemon?limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`);

export const getAllPokemons = async () => {
  const storedList =
    localStorage.getItem('all_pokemons') &&
    JSON.stringify(localStorage.getItem('all_pokemons'));

  if (
    storedList &&
    new Date() - new Date(storedList.savedAt) <= CACHE_TIMEOUT
  ) {
    return storedList.list;
  }

  const fetchedList = await getFromApi('/pokemon?limit=1000');
  localStorage.setItem('all_pokemons', {
    savedAt: new Date().toISOString(),
    list: fetchedList.body,
  });

  return fetchedList.body;
};

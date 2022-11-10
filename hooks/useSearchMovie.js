import { useState } from 'react';

const movieDbUrl = process.env.NEXT_PUBLIC_MOVIEDB_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY

const useSearcMovie = (setLoading = () => {}, callback = () => {}) => {
  const [results, setResults] = useState([]);
  const searchMovie = async (query) => {
    setLoading(true);
    try {
      const endpoint = `${movieDbUrl}search/keyword?api_key=${apiKey}&query=${query}&page=1`
      const response = await fetch(endpoint);
      const movies = await response.json();
      setResults(movies.results);

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
    setLoading(false)
    callback(true);
  }

  return {
    searchMovie,
    results
  };
};

export default useSearcMovie;

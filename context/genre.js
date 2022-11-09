import { createContext, useContext, useMemo, useReducer } from 'react';

const GenreContext = createContext();

export function GenreContextProvider({ children, genre }) {
  const [genreState, setGenreState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      genres: genre || null
    }
  );

  const contextValue = useMemo(() => [genreState], [genreState]);

  return (
    <GenreContext.Provider value={contextValue}>
      {children}
    </GenreContext.Provider>
  );
};

export function useGenreContext() {
  return useContext(GenreContext);
}

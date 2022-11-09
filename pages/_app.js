import '../styles/globals.css'
import { Provider } from 'react-redux';
import NextApp from 'next/app';
import store from '../store';
import { GenreContextProvider } from '../context'

function MyApp({ Component, pageProps, genres }) {

  return (
    <Provider store={store}>
      <GenreContextProvider genre={genres}>
        <Component {...pageProps} />
      </GenreContextProvider>
    </Provider>
  )
}

export default MyApp;

MyApp.getInitialProps = async (appCtx) => {
  const {
    NEXT_PUBLIC_MOVIEDB_URL,
    NEXT_PUBLIC_API_KEY
  } = process.env;
  const context = appCtx?.ctx;
  const appProps = await NextApp.getInitialProps(appCtx);

  let genreData;

  try {
    const endpoint = `${NEXT_PUBLIC_MOVIEDB_URL}genre/movie/list?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`;
    const response = await fetch(endpoint);
    genreData = await response.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    return null;
  }

  return {
    genres: genreData || null
  };
}

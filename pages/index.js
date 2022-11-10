import Head from 'next/head';
import { DefaultLayout as Layout } from '../components/Layout'
import DiscoverMovie from '../components/DiscoverMovie';
import Sliders from '../components/Sliders';
import Footer from '../components/Footer';

export default function Home(props) {
  const { discoverMovie, popularMovie } = props;
  return (
    <Layout>
      <div>
        <Head>
          <title>MoovieTime</title>
          <meta name="description" content="MoovieTime" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col items-center flex-1 flex-shrink-0 space-y-10">
          <Sliders
            movies={popularMovie.results}
          />
          <div className='container mx-auto'>
            <DiscoverMovie
              movies={discoverMovie.results}
            />
          </div>
        </div>
        <Footer/>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const {
    NEXT_PUBLIC_MOVIEDB_URL,
    NEXT_PUBLIC_API_KEY
  } = process.env;
  const { query } = context;
  const sortBy = query.sort_by || "popularity.desc";

  let discoverMovie;
  let popularMovie;

  try {
    const endpoint = `${NEXT_PUBLIC_MOVIEDB_URL}discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&year=2022&with_watch_monetization_types=flatrate`;

    const response = await fetch(endpoint);
    discoverMovie = await response.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }

  try {
    const endpoint = `${NEXT_PUBLIC_MOVIEDB_URL}movie/popular?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;

    const response = await fetch(endpoint);
    popularMovie = await response.json();

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }

  return {
    props: {
      discoverMovie: discoverMovie || null,
      popularMovie: popularMovie || null
    }
  }
};

import styled from 'styled-components';
import { useRouter } from 'next/router';
import MovieCard from './MovieCard';

const Section = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4 w-full`
}))``;

const TitleContainer = styled.div.attrs(() => ({
  className: `flex flex-row justify-between items-end`
}))``;

const TitleWrapper = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4`
}))``;

const RedLine = styled.hr.attrs(() => ({
  className: `flex w-20 border-b-4 border-primaryRed rounded-md`
}))``;

const Title = styled.div.attrs(() => ({
  className: `text-white font-semibold`
}))``;

const FilterWrapper = styled.div.attrs(() => ({
  className: `flex flex-row jusitfy-between w-60 space-x-2`
}))``;

const FilterButton = styled.button.attrs((props) => ({
  className: `rounded-lg w-28 text-sm text-center text-white bg-primary hover:bg-red py-0 px-2 ${props.isActive && 'bg-red'}`
}))``;

const MovieDiscover = styled.div.attrs(() => ({
  className: `grid grid-cols-5 gap-4 items-start`
}))``;

export default function DiscoverMovie(props) {
  const { movies } = props;

  const router = useRouter();
  const sortBy = router?.query?.sort_by || null;

  const filterHandler = (querySort) => {
    router.query.sort_by = querySort;
    router.push({
      pathname: router.pathname,
      query: router.query
    });
  }

  return (
    <Section>
      <TitleContainer>
        <TitleWrapper>
          <RedLine/>
          <Title>
            Discover Movie
          </Title>
        </TitleWrapper>
        <FilterWrapper>
          <FilterButton
            isActive={!sortBy || sortBy === 'popularity.desc'}
            onClick={() => filterHandler("popularity.desc")}
          >
            Popularity
          </FilterButton>
          <FilterButton
            isActive={sortBy === 'release_date.desc'}
            onClick={() => filterHandler("release_date.desc")}
          >
            Release Date
          </FilterButton>
        </FilterWrapper>
      </TitleContainer>
      <MovieDiscover>
        {
          movies?.map((item, index) => {
            return (
              <MovieCard
                key={index}
                title={item.title}
                score={item.vote_average}
                releaseDate={item.release_date}
                poster={item.poster_path}
                genreIds={item.genre_ids}
              />
            )
          })
        }
      </MovieDiscover>
    </Section>
  )
}

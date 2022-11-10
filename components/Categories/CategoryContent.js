import styled from 'styled-components';
import MovieCard from '../MovieCard';

const Section = styled.div.attrs(() => ({
  className: `flex flex-col space-y-6 w-full`
}))``;

const TitleWrapper = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4 w-full`
}))``;

const RedLine = styled.hr.attrs(() => ({
  className: `flex w-20 border-b-4 border-primaryRed rounded-md`
}))``;

const Title = styled.h1.attrs(() => ({
  className: `text-xl text-white font-semibold`
}))``;

const ContentSection = styled.div.attrs(() => ({
  className: `flex flex-row space-x-4 justify-center`
}))``;

const MovieWrapper = styled.div.attrs(() => ({
  className: `grid grid-cols-4 gap-4`
}))``;

export default function CategoryContent(props) {
  const { movies } = props;
  return (
    <Section>
      <TitleWrapper>
        <RedLine />
        <Title>
          Movies
        </Title>
      </TitleWrapper>
      <ContentSection>
        <MovieWrapper>
          {
            movies.map((item, index) => {
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
        </MovieWrapper>
      </ContentSection>
    </Section>
  )
}

import React, { forwardRef } from 'react';
import CustomSplide from './CustomSplide';
import { SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import styled from 'styled-components';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { useGenreContext } from '../context';

const Section = styled.div.attrs(() => ({
  className: `relative w-full h-full bg-second border-b-1 border-white`
}))``;

const WrapperSlide = forwardRef((props, ref) => {
  return (
    <CustomSplide customRef={ref} {...props} />
  );
});

const Item = styled(SplideSlide)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieInfo = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2 bg-black w-1/2 py-4 px-2 min-h-[40%]`
}))``;

const ImageWrapper = styled.div.attrs(() => ({
  className: `relative`
}))``;

const DetailWrapper = styled.div.attrs(() => ({
  className: `flex flex-row space-x-2`
}))``;

const MovieTitle = styled.div.attrs(() => ({
  className: `text-white text-lg font-semibold`
}))``;

export default function Sliders(props) {
  const { movies } = props;
  const [{ genres }] = useGenreContext();

  const genreHandler = (genreIds) => {
    let genreName = [];
    for (let index = 0; index < genreIds.length; index++) {
      const element = genreIds[index];
      const genreFound = genres.genres.find(g => g.id === element);

      genreName.push(genreFound.name);
    };

    return genreName;
  }

  const sliderSetting = {
    type: 'loop',
    gap: '1rem',
    autoplay: false,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: false,
    arrows: 'slider',
    perPage: 3,
    perMove: 1,
    focus: 'center'
  };

  return (
    <Section>
      <WrapperSlide
        options={sliderSetting}
      >
        {
          movies?.map((movie, index) => {
            const genreMovie = genreHandler(movie.genre_ids);
            return (
              <Item
                key={index}
              >
                <ImageWrapper>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    width={243.08}
                    height={362.61}
                  />
                </ImageWrapper>
                <MovieInfo>
                  <DetailWrapper>
                    <AiFillStar className="text-yellow-500 w-6 h-6"/>
                    <div className='text-white'>
                      {movie.vote_average}
                    </div>
                  </DetailWrapper>
                  <MovieTitle>
                    {movie.title}
                  </MovieTitle>
                  <DetailWrapper>
                    <div className='text-white text-xs'>
                      {parseInt(movie.release_date)}
                    </div>
                    <div className='text-white text-xs whitespace-pre-line'>
                      {genreMovie.toString()}
                    </div>
                  </DetailWrapper>
                  <div className='text-white text-xs whitespace-pre-line'>
                    {movie.overview}
                  </div>
                </MovieInfo>
              </Item>
            )
          })
        }
      </WrapperSlide>
    </Section>
  )
}

import styled from "styled-components";
import Image from 'next/image';
import PlaceholderImage from "../helper/placeholder";
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useGenreContext } from "../context";

const Section = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2`
}))``;

const ImageWrapper = styled.div.attrs((props) => ({
  className: `relative ${props.isHover && 'invisible'}`
}))``;

const MovieInfo = styled.div.attrs(() => ({
  className: `flex flex-col space-y-1`
}))``;

const MovieTitle = styled.div.attrs(() => ({
  className: `text-white font-semibold`
}))``;

const MovieYear = styled.div.attrs(() => ({
  className: `text-gray-300 text-sm`
}))``;

const Score = styled.div.attrs(() => ({
  className: `bg-second/[0.6] text-white font-medium p-1`
}))``;

const HoverCard = styled.div.attrs((props) => ({
  className: `absolute flex flex-col space-y-6 items-center justify-center bg-black/[0.8] ${props.isHover ? 'visible' : 'invisible'}`
}))`
  width: 220px;
  height: 330px;
`;

const HoverScoreContainer = styled.div.attrs(() => ({
  className: `flex flex-row space-x-2 items-center`
}))``;

const Genre = styled.div.attrs(() => ({
  className: `text-white font-semibold text-center`
}))``;

const ViewButton = styled.a.attrs(() => ({
  className: `bg-red rounded-lg text-white font-medium text-center py-1 px-4`
}))``;

export default function MovieCard(props) {
  const { title, score, releaseDate, poster, genreIds } = props;

  const [isHover, setIsHover] = useState(false);
  const [{ genres }] = useGenreContext();

  let genreName = [];

  for (let index = 0; index < genreIds.length; index++) {
    const element = genreIds[index];
    const genreFound = genres.genres.find(g => g.id === element);

    genreName.push(genreFound.name);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  let posterImage = PlaceholderImage;

  if (poster) {
    posterImage = `https://image.tmdb.org/t/p/original${poster}`;
  }

  return (
    <Section>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <HoverCard
          isHover={isHover}
        >
          <HoverScoreContainer>
            <AiFillStar className="text-yellow-500 w-6 h-6"/>
            <div className="text-white">
              {score}
            </div>
          </HoverScoreContainer>
          <Genre>
            {genreName.toString()}
          </Genre>
          <ViewButton>
            View
          </ViewButton>
        </HoverCard>
        <ImageWrapper
          isHover={isHover}
        >
          <div className="absolute left-28 lg:left-48">
            <Score>
              {score}
            </Score>
          </div>
          <Image
            src={posterImage}
            alt={title}
            width={220}
            height={330}
          />
        </ImageWrapper>
      </div>
      <MovieInfo>
        <MovieTitle>
          {title}
        </MovieTitle>
        <MovieYear>
          {parseInt(releaseDate)}
        </MovieYear>
      </MovieInfo>
    </Section>
  )
}

import styled from 'styled-components';
import Image from 'next/image';
import { MdMovie } from 'react-icons/md';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useRef, useState } from 'react';
import useSearchMovie from '../hooks/useSearchMovie';
import dynamic from 'next/dynamic';
const DropdownCategories = dynamic(() => import('./Dropdown/Categories'), { ssr: false });
const DropdownSearch  = dynamic(() => import('./Dropdown/Search'), { ssr: false });

const HeaderContainer = styled.div.attrs(() => ({
  className: `bg-second p-3 mx-auto border-b border-primary flex justify-center`
}))``;

const Container = styled.div.attrs(() => ({
  className: `container flex flex-row items-center flex-1 flex-shrink-0 w-full space-x-4`
}))`
  min-height: 66px;
`;

const LogoWrapper = styled.div.attrs(() => ({
  className: `relative`
}))``;

const InputContainer = styled.div.attrs(() => ({
  className: `relative flex items-center justify-self-stretch flex-grow text-gray-600`
}))``;

const SearchInput = styled.input.attrs((props) => ({
  className: `rounded-lg text-xs xl:text-sm px-12 py-4 focus:outline-none w-full shadow-sm bg-primary`,
}))``;

const MovieIconWrapper = styled.div.attrs(() => ({
  className: `flex items-center absolute h-full left-0 pl-4`
}))`
  width: 2.3rem;
  height: 2.3rem;
`;

const SearchButton = styled.button.attrs(() => ({
  className: `flex flex-row items-center absolute h-full right-0 pr-4 cursor-pointer`,
  type: 'button'
}))`
  width: 2.3rem;
  height: 2.3rem;
`;

const MenuContainer = styled.div.attrs(() => ({
  className: `text-sm flex flex-row space-x-6 items-center`
}))``;

const MenuItem = styled.a.attrs(() => ({
  className: `text-white font-semibold`
}))``;

export default function Header () {
  const CategoriesRef = useRef(null);
  const SearchRef = useRef(null);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false)
  const [query, setQuery] = useState('');
  const { searchMovie, results } = useSearchMovie(setIsSearching, setSearchVisible);

  const typingKeywordHandler = () => {
    if (query?.length > 2) {
      searchMovie(query, setIsSearching);
    } else {
      searchMovie("", setIsSearching);
      setSearchVisible(false);
    }
  }

  return (
    <HeaderContainer>
      <Container>
        <LogoWrapper>
          <Image
            src="/MoovieTime-Logo.png"
            alt="Moovie Time"
            width={112}
            height={31}
          />
        </LogoWrapper>
        <InputContainer
          ref={SearchRef}
        >
          <MovieIconWrapper>
            <MdMovie className='w-6 h-6 text-gray-500'/>
          </MovieIconWrapper>
          <SearchInput
            placeholder="Find Movie"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              typingKeywordHandler();
            }}
          />
          <DropdownSearch
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
            SearchRef={SearchRef}
            results={results}
          />
          <SearchButton>
            <HiMagnifyingGlass className='w-6 h-6 text-white' />
          </SearchButton>
        </InputContainer>
        <MenuContainer>
          <MenuItem
            ref={CategoriesRef}
            onClick={() => setCategoryVisible(true)}
          >
            CATEGORIES
            <DropdownCategories
              categoryVisible={categoryVisible}
              setCategoryVisible={setCategoryVisible}
              CategoriesRef={CategoriesRef}
            />
          </MenuItem>
          <MenuItem>
            MOVIES
          </MenuItem>
          <MenuItem>
            TV SHOW
          </MenuItem>
          <MenuItem>
            LOGIN
          </MenuItem>
        </MenuContainer>
      </Container>
    </HeaderContainer>
  )
}

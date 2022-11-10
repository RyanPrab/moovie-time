import styled from "styled-components";
import { useGenreContext } from "../../context";
import dynamic from 'next/dynamic';
import Breakpoint from '../../helper/Breakpoints';
const { mediaQuery } = Breakpoint;
const Select = dynamic(() => import('react-select'), { ssr: false });

const Section = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4 rounded-md p-4`
}))``;

const FilterName = styled.div.attrs(() => ({
  className: `text-white font-semibold`
}))``;

const FormSelect = styled(Select).attrs(() => ({
  className: `rounded-lg text-xs md:text-sm`
}))`
  min-width: 200px;
  @media only screen and ${mediaQuery.xs} {
    min-width: 160px;
  }
`;

const CheckboxContainer = styled.div.attrs(() => ({
  className: `inline-flex items-center mx-1`
}))``;

const CheckboxInput = styled.input.attrs(() => ({
  className: `appearance-none w-5 h-5 focus:ring-opacity-25 border border-gray-300 rounded checked:bg-primary checked:border-transparent cursor-pointer`,
  type: 'checkbox'
}))`
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const Label = styled.label.attrs(() => ({
  className: `flex items-center text-sm text-gray-500 font-light cursor-pointer`
}))``;

export default function Filter() {
  const [{ genres }] = useGenreContext();

  const sortOptions = [
    { value: 'popularity.asc', label: 'Popularity Ascending' },
    { value: 'popularity.desc', label: 'Popularity Descending' },
    { value: 'release_date.asc', label: 'Release Date Ascending' },
    { value: 'release_date.desc', label: 'Release Date Descending' },
    { value: 'vote_average.asc', label: 'Rating Ascending' },
    { value: 'vote_average.desc', label: 'Rating Descending' }
  ];
  return (
    <Section>
      <FilterName>
        Sort Result By
      </FilterName>


    </Section>
  )
}

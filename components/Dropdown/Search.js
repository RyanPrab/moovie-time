import styled from "styled-components";
import { useRef, useEffect } from "react";
import { usePopper } from 'react-popper';
import dynamic from "next/dynamic";
const MiniDropdown = dynamic(() => import('./MiniDropdown'), { ssr: false });

const Section = styled.div.attrs(() => ({
  className: `bg-second flex flex-col space-y-2`
}))`
  width: 780px;
  }
`;

const ListItem = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2`
}))``;

const Item = styled.a.attrs(() => ({
  className: `text-white text-sm`
}))``;

export default function Search(props) {
  const { searchVisible, setSearchVisible, SearchRef, results } = props;
  const menuRef = useRef(null);
  const arrowRef = useRef(null);

  const { styles, attributes, update: updateDropdownSearch } = usePopper(
    SearchRef.current,
    menuRef.current,
    {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [0, 10]
          }
        },
        {
          name: 'arrow',
          enabled: true,
          options: {
            padding: 10,
            element: arrowRef.current
          }
        },
        {
          name: 'flip',
          options: {
            altBoundary: true,
            rootBoundary: 'document',
            boundary: SearchRef?.current
          }
        },
        {
          name: 'computeStyles',
          options: {
            adaptive: false
          }
        }
      ]
    }
  );

  useEffect(() => {
    if (searchVisible && typeof updateDropdownSearch === 'function') {
      updateDropdownSearch();

      return () => {
        updateDropdownSearch();
      };
    }
  }, [searchVisible, updateDropdownSearch]);


  const handleOverOutside = e => {
    if (!SearchRef.current?.contains(e.target)) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && searchVisible) {
      document.addEventListener('click', e => {
        handleOverOutside(e)
      });

      return () => {
        document.removeEventListener('mousedown', e => {
          handleOverOutside(e)
        });
      };
    }
  }, [searchVisible]);

  return (
    <MiniDropdown
      arrowRef={arrowRef}
      arrowStyles={{ ...styles.arrow }}
      offsetStyles={styles.offset}
      popperRef={menuRef}
      popperStyles={{ ...styles.popper, margin: 0, border: '0px' }}
      popperAttributes={{ ...attributes.popper }}
      visible={searchVisible}
      dark={true}
    >
      <Section>
        <ListItem>
          {
            results?.map((movie, index) => {
              return (
                <Item
                  key={index}
                >
                  {movie.name}
                </Item>
              )
            })
          }
        </ListItem>
      </Section>
    </MiniDropdown>
  )
}

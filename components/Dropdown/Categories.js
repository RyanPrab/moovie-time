import styled from "styled-components";
import { useRef, useEffect } from "react";
import { usePopper } from 'react-popper';
import dynamic from "next/dynamic";
import { useGenreContext } from '../../context';
const MiniDropdown = dynamic(() => import('./MiniDropdown'), { ssr: false });

const Section = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4 overflow-y-auto max-h-40`
}))``;

const Item = styled.a.attrs(() => ({
  className: `text-sm font-semibold`
}))``;

export default function DropdwonCategories(props) {
  const { categoryVisible, setCategoryVisible, CategoriesRef} = props;
  const [{ genres }] = useGenreContext();
  const menuRef = useRef(null);
  const arrowRef = useRef(null);

  const { styles, attributes, update: updateDropdownCategory } = usePopper(
    CategoriesRef.current,
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
            boundary: CategoriesRef?.current
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
    if (categoryVisible && typeof updateDropdownCategory === 'function') {
      updateDropdownCategory();

      return () => {
        updateDropdownCategory();
      };
    }
  }, [categoryVisible, updateDropdownCategory]);


  const handleOverOutside = e => {
    if (!CategoriesRef.current?.contains(e.target)) {
      setCategoryVisible(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && categoryVisible) {
      document.addEventListener('click', e => {
        handleOverOutside(e)
      });

      return () => {
        document.removeEventListener('mousedown', e => {
          handleOverOutside(e)
        });
      };
    }
  }, [categoryVisible]);

  return (
    <MiniDropdown
      arrowRef={arrowRef}
      arrowStyles={{ ...styles.arrow }}
      offsetStyles={styles.offset}
      popperRef={menuRef}
      popperStyles={{ ...styles.popper, margin: 0, border: '0px' }}
      popperAttributes={{ ...attributes.popper }}
      visible={categoryVisible}
    >
      <Section>
        {
          genres?.genres?.map((item, index) => {
            return (
              <Item
                key={index}
              >
                {item?.name}
              </Item>
            )
          })
        }
      </Section>
    </MiniDropdown>
  )
}

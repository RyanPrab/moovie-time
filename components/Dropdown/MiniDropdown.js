import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropdownContainer = styled.div.attrs(props => ({
  className: `bg-white ${props.visible ? 'flex-col' : 'hidden'} space-y-3 rounded-md shadow-md p-4 text-black ${props?.small ? 'max-w-md' : ''}`
}))`
  z-index: 5;
  min-width: 350px;
`;

const DropdownArrow = styled.div.attrs(props => ({
  className: `shadow-md ${props.visible ? 'block' : 'hidden'}`
}))`
  z-index: -1;
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fff;
  visibility: hidden;
  margin-top: -2px;
  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    margin-top: -2px;
    width: 20px;
    height: 20px;
    background: #fff;
    visibility: visible;
    transform: rotate(45deg);
  }
`;

const ForwardedPopper = forwardRef((props, ref) => (
  <div {...props} ref={ref} />
));

const ForwardedArrow = forwardRef((props, ref) => (
  <DropdownArrow {...props} ref={ref} />
));

export default function MiniDropdown(props) {
  const {
    children,
    visible,
    popperRef,
    popperStyles,
    popperAttributes,
    arrowRef,
    arrowStyles,
    offsetStyles,
    small
  } = props;

  return (
    <ForwardedPopper
      ref={popperRef}
      style={{ ...popperStyles, zIndex: 25 }}
      {...popperAttributes}
      className="block"
    >
      <ForwardedArrow
        ref={arrowRef}
        style={{ ...arrowStyles }}
        visible={visible}
      />
      <DropdownContainer
        style={offsetStyles}
        visible={visible}
        small={small}
      >
        {children}
      </DropdownContainer>
    </ForwardedPopper>
  );
};

MiniDropdown.propTypes = {
  arrowRef: PropTypes.object.isRequired,
  arrowStyles: PropTypes.object,
  offsetStyles: PropTypes.object,
  popperAttributes: PropTypes.object,
  popperRef: PropTypes.object.isRequired,
  popperStyles: PropTypes.object,
  visible: PropTypes.bool
};

MiniDropdown.defaultProps = {
  arrowStyles: {},
  offsetStyles: {},
  popperAttributes: {},
  popperStyles: {},
  visible: false
};


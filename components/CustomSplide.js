import React from 'react';
import { Splide } from '@splidejs/react-splide';

export default function CustomSplide({ customRef, ...props }) {
  return <Splide {...props} ref={customRef} />;
};

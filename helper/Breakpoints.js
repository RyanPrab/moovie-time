const breakpoints = {
  '4xs': '280px',
  '3xs': '375px',
  '2xs': '414px',
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '960px',
  xl: '1024px',
  '2xl': '1280px',
  '3xl': '1536px'
};

const mediaQuery = {
  sm: `(max-width: ${breakpoints.sm})`,
  md: `(max-width: ${breakpoints.md})`,
  lg: `(max-width: ${breakpoints.lg})`,
  xl: `(max-width: ${breakpoints.xl})`,
  xs: `(max-width: ${breakpoints.xs})`,
  '3xl': `(max-width: ${breakpoints['3xl']})`,
  '2xl': `(max-width: ${breakpoints['2xl']})`,
  '2xs': `(max-width: ${breakpoints['2xs']})`,
  '3xs': `(max-width: ${breakpoints['3xs']})`,
  '4xs': `(max-width: ${breakpoints['4xs']})`,
};

export default {
  breakpoints,
  mediaQuery
};

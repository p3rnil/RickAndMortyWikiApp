const palette = {
  color1: '#121212',
  color2: '#3A3A3C',
  color3: '#FFDD4A',
  color4: '#FFFFFF',
};
export const colors = {
  background: palette.color1,
  elevation: palette.color2,
  text: palette.color4,
};

const themedColors = {
  default: {
    ...colors,
  },
  light: {
    ...colors,
    background: palette.color4,
    elevation: palette.color4,
    text: palette.color1,
  },
  dark: {
    ...colors,
    background: palette.color1,
    elevation: palette.color2,
    text: palette.color4,
  },
};

export default themedColors;

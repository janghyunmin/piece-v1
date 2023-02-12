const Input = {
  baseStyle: {
    color: 'black_primary',
    placeholderTextColor: 'gray.500',
    borderRadius: 0,
    pl: 0,
  },
  variants: {
    underlined: {
      borderColor: 'gray.300',
      _focus: {
        borderBottomWidth: 2,
        borderBottomColor: 'gray.800',
      },
    },
    warn: {
      borderBottomWidth: 1,
      borderBottomColor: 'warning.500',
      _focus: {
        borderBottomWidth: 2,
        borderBottomColor: 'warning.500',
      },
    },
  },
  defaultProps: { size: 'textM', allowFontScaling: false },
  sizes: {
    textXL: {
      fontSize: '26px',
      lineHeight: '34px',
      letterSpacing: '.03px',
      fontWeight: '400',
    },
    textL: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '.03px',
      fontWeight: '400',
    },
    textM: {
      fontSize: '16px',
      lineHeight: '25px',
      letterSpacing: '.03px',
      fontWeight: '400',
    },
    textS: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '.03px',
      fontWeight: '400',
    },
  },
};

export default Input;

const TextArea = {
  baseStyle: {
    multiline: true,
    p: '10px',
    color: 'gray.600',
  },
  defaultProps: { size: 'textS', allowFontScaling: false },
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

export default TextArea;
